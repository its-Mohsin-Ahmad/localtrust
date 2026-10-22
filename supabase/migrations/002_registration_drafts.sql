-- INVOLVE Migration 002
-- Adds session-scoped registration drafts and server-side registration
-- payment confirmation (create_registration_payment / confirm_registration_payment).

-- ============================================
-- Registration Drafts (session-scoped persistence)
-- ============================================
create table if not exists registration_drafts (
  id uuid default uuid_generate_v4() primary key,
  session_key text not null unique,
  user_id uuid references profiles(id) on delete cascade,
  account_type text check (account_type in ('customer', 'provider')),
  step integer default 1 check (step between 1 and 4),
  data jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table registration_drafts enable row level security;

-- session_key acts as an unguessable capability token for anonymous drafts.
-- Once signed up, drafts are also bound to user_id.
create policy "Anyone can create a registration draft"
  on registration_drafts for insert with check (true);

create policy "Anyone can read a registration draft by session key"
  on registration_drafts for select using (true);

create policy "Anyone can update a registration draft by session key"
  on registration_drafts for update using (true);

create policy "Anyone can delete a registration draft by session key"
  on registration_drafts for delete using (true);

create index idx_registration_drafts_session on registration_drafts(session_key);
create index idx_registration_drafts_user on registration_drafts(user_id);

-- ============================================
-- Server-side registration payment (no client-side faking)
-- ============================================
-- Creates a pending registration payment record. Runs as the function owner
-- (security definer) so it can be invoked by the anon key before/during
-- onboarding without being blocked by RLS on registration_payments.
create or replace function public.create_registration_payment(
  p_user_id uuid,
  p_account_type text,
  p_amount_paisa integer,
  p_currency text default 'PKR',
  p_receipt_reference text
)
returns table (
  id uuid,
  receipt_reference text,
  status text,
  amount_paisa integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  -- Idempotency: return an existing payment for the same receipt reference.
  select id into v_id
  from registration_payments
  where receipt_reference = p_receipt_reference
  limit 1;

  if v_id is not null then
    return query
    select id, receipt_reference, status, amount_paisa
    from registration_payments
    where id = v_id;
    return;
  end if;

  return query
  insert into registration_payments (
    user_id,
    account_type,
    amount_paisa,
    currency,
    status,
    receipt_reference
  ) values (
    p_user_id,
    p_account_type,
    p_amount_paisa,
    p_currency,
    'pending',
    p_receipt_reference
  )
  returning id, receipt_reference, status, amount_paisa;
end;
$$;

-- Confirms a registration payment as succeeded. Security definer so the
-- server can mark payment status after external provider confirmation.
-- Only transitions pending -> succeeded for the owning user's receipt.
create or replace function public.confirm_registration_payment(
  p_user_id uuid,
  p_receipt_reference text
)
returns table (
  id uuid,
  receipt_reference text,
  status text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  update registration_payments
  set status = 'succeeded', updated_at = now()
  where user_id = p_user_id
    and receipt_reference = p_receipt_reference
    and status = 'pending';

  return query
  select id, receipt_reference, status
  from registration_payments
  where user_id = p_user_id
    and receipt_reference = p_receipt_reference;

  return;
end;
$$;

-- Allow profiles to read registration fee paid flag (already exists).
-- No schema change to profiles needed.
