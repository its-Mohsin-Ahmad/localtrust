-- ============================================================
-- 003 — Secure, client-driven registration flow
-- ============================================================
-- Replaces the insecure patterns from 002 (which trusted a client-
-- supplied p_user_id) with security-definer RPCs that derive the
-- acting user from auth.uid(). Registration drafts remain capability-
-- based (session_key) but are only readable/writable through the
-- SECURITY DEFINER functions below, so they cannot be enumerated.
--
-- Idempotent: safe to re-run on a project where 001/002 were (or
-- were not) applied. Apply via the Supabase SQL editor or CLI.
-- ============================================================

-- ------------------------------------------------------------
-- 1. registration_drafts table (ensure exists)
-- ------------------------------------------------------------
create table if not exists registration_drafts (
  id            uuid primary key default uuid_generate_v4(),
  session_key   text not null unique,
  user_id       uuid references profiles(id) on delete cascade,
  account_type  text not null check (account_type in ('customer', 'provider')),
  step          integer not null default 1 check (step between 1 and 4),
  data          jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_registration_drafts_session_key
  on registration_drafts (session_key);
create index if not exists idx_registration_drafts_user_id
  on registration_drafts (user_id);

alter table registration_drafts enable row level security;

do $$
begin
  if exists (select 1 from pg_policies where schemaname = 'public'
             and tablename = 'registration_drafts'
             and policyname = 'Anyone can read a registration draft by session key') then
    execute 'drop policy "Anyone can read a registration draft by session key" on registration_drafts';
  end if;
  if exists (select 1 from pg_policies where schemaname = 'public'
             and tablename = 'registration_drafts'
             and policyname = 'Anyone can insert a registration draft') then
    execute 'drop policy "Anyone can insert a registration draft" on registration_drafts';
  end if;
  if exists (select 1 from pg_policies where schemaname = 'public'
             and tablename = 'registration_drafts'
             and policyname = 'Anyone can update a registration draft') then
    execute 'drop policy "Anyone can update a registration draft" on registration_drafts';
  end if;
  if exists (select 1 from pg_policies where schemaname = 'public'
             and tablename = 'registration_drafts'
             and policyname = 'Anyone can delete a registration draft') then
    execute 'drop policy "Anyone can delete a registration draft" on registration_drafts';
  end if;
end $$;

-- ------------------------------------------------------------
-- 2. Missing RLS policies for registration-related tables
-- ------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='provider_profiles' and policyname='Providers can insert own profile') then
    execute 'create policy "Providers can insert own profile" on provider_profiles for insert with check (auth.uid() = id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='provider_services' and policyname='Providers manage own services') then
    execute 'create policy "Providers manage own services" on provider_services for all using (auth.uid() = provider_id) with check (auth.uid() = provider_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='provider_verifications' and policyname='Providers insert own verification') then
    execute 'create policy "Providers insert own verification" on provider_verifications for insert with check (auth.uid() = provider_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='provider_verifications' and policyname='Providers view own verification') then
    execute 'create policy "Providers view own verification" on provider_verifications for select using (auth.uid() = provider_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='provider_documents' and policyname='Providers manage own documents') then
    execute 'create policy "Providers manage own documents" on provider_documents for all using (auth.uid() = provider_id) with check (auth.uid() = provider_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='customer_addresses' and policyname='Customers manage own addresses') then
    execute 'create policy "Customers manage own addresses" on customer_addresses for all using (auth.uid() = customer_id) with check (auth.uid() = customer_id)';
  end if;
end $$;

-- ------------------------------------------------------------
-- 3. Seed categories & services (idempotent)
-- ------------------------------------------------------------
insert into categories (id, name, slug, is_active)
values
  (uuid_generate_v4(), 'Plumbing', 'plumbing', true),
  (uuid_generate_v4(), 'Electrical', 'electrical', true),
  (uuid_generate_v4(), 'Home Cleaning', 'home_cleaning', true),
  (uuid_generate_v4(), 'Mechanics', 'mechanics', true),
  (uuid_generate_v4(), 'Tutoring', 'tutoring', true),
  (uuid_generate_v4(), 'Carpentry', 'carpentry', true),
  (uuid_generate_v4(), 'Painting', 'painting', true),
  (uuid_generate_v4(), 'AC & Refrigeration', 'ac_refrigeration', true),
  (uuid_generate_v4(), 'Appliance Repair', 'appliance_repair', true),
  (uuid_generate_v4(), 'Computer & IT', 'computer_it', true),
  (uuid_generate_v4(), 'Gardening', 'gardening', true),
  (uuid_generate_v4(), 'Moving Services', 'moving_services', true),
  (uuid_generate_v4(), 'Solar Installation', 'solar_installation', true),
  (uuid_generate_v4(), 'Pest Control', 'pest_control', true),
  (uuid_generate_v4(), 'Construction', 'construction', true),
  (uuid_generate_v4(), 'Beauty & Personal Care', 'beauty_personal_care', true),
  (uuid_generate_v4(), 'Photography', 'photography', true),
  (uuid_generate_v4(), 'Laundry', 'laundry', true),
  (uuid_generate_v4(), 'Other Services', 'other_services', true)
on conflict (slug) do nothing;

insert into services (category_id, name, slug, is_active)
select c.id, c.name, c.slug, true
from categories c
where not exists (select 1 from services s where s.slug = c.slug)
on conflict (slug) do nothing;

-- ------------------------------------------------------------
-- 4. Secure RPCs
-- ------------------------------------------------------------

create or replace function public.save_registration_draft(
  p_session_key text,
  p_account_type text,
  p_step integer,
  p_data jsonb
)
returns setof registration_drafts
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_existing uuid;
begin
  if p_session_key is null or length(trim(p_session_key)) < 16 then
    raise exception 'invalid session key';
  end if;
  if p_account_type not in ('customer', 'provider') then
    raise exception 'invalid account type';
  end if;
  if p_step < 1 or p_step > 4 then
    raise exception 'invalid step';
  end if;

  select id into v_existing
    from registration_drafts
   where session_key = p_session_key
     and ((v_user is not null and user_id = v_user)
          or (v_user is null and user_id is null))
   for update;

  if v_existing is null then
    if exists (select 1 from registration_drafts where session_key = p_session_key) then
      raise exception 'draft not accessible';
    end if;
    return query
      insert into registration_drafts (session_key, user_id, account_type, step, data)
      values (p_session_key, v_user, p_account_type, p_step, coalesce(p_data, '{}'::jsonb))
      returning *;
  else
    return query
      update registration_drafts
         set account_type = coalesce(p_account_type, account_type),
             step = p_step,
             data = coalesce(p_data, data),
             user_id = coalesce(user_id, v_user),
             updated_at = now()
       where id = v_existing
       returning *;
  end if;
end;
$$;

grant execute on function public.save_registration_draft(text, text, integer, jsonb)
  to anon, authenticated;

create or replace function public.get_registration_draft(p_session_key text)
returns setof registration_drafts
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
begin
  if p_session_key is null or length(trim(p_session_key)) < 16 then
    raise exception 'invalid session key';
  end if;
  return query
    select * from registration_drafts
     where session_key = p_session_key
       and ((v_user is not null and user_id = v_user)
            or (v_user is null and user_id is null)
            or user_id is null);
end;
$$;

grant execute on function public.get_registration_draft(text)
  to anon, authenticated;

create or replace function public.delete_registration_draft(p_session_key text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
begin
  if p_session_key is null or length(trim(p_session_key)) < 16 then
    raise exception 'invalid session key';
  end if;
  delete from registration_drafts
   where session_key = p_session_key
     and ((v_user is not null and user_id = v_user) or user_id is null);
end;
$$;

grant execute on function public.delete_registration_draft(text)
  to anon, authenticated;
drop function if exists public.create_registration_payment(text, integer, text, text, text);
create or replace function public.create_registration_payment(
  p_account_type text,
  p_amount_paisa integer,
  p_currency text default 'PKR',
  p_payment_method text default null,
  p_receipt_reference text default null,
  p_transaction_ref text default null
)
returns table(id uuid, receipt_reference text, status text, amount_paisa integer, currency text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_ref text;
  v_row registration_payments;
begin
  if v_user is null then
    raise exception 'authentication required';
  end if;
  if p_account_type not in ('customer', 'provider') then
    raise exception 'invalid account type';
  end if;
  if p_amount_paisa <> 20000 then
    raise exception 'invalid registration fee amount';
  end if;
  if p_payment_method is not null
     and p_payment_method not in ('easypaisa', 'jazzcash', 'card', 'bank') then
    raise exception 'invalid payment method';
  end if;

  select * into v_row
    from registration_payments
   where user_id = v_user and account_type = p_account_type and status = 'pending'
   order by created_at desc
   limit 1;
  if v_row.id is not null then
    return query
      select v_row.id, v_row.receipt_reference, v_row.status, v_row.amount_paisa, v_row.currency;
    return;
  end if;

  if p_receipt_reference is not null and length(trim(p_receipt_reference)) > 0 then
    v_ref := trim(p_receipt_reference);
  else
    v_ref := 'INV-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12));
  end if;

  return query
    insert into registration_payments (
      user_id, account_type, amount_paisa, currency, status,
      receipt_reference, payment_method, transaction_ref
    )
    values (
      v_user, p_account_type, p_amount_paisa, coalesce(p_currency, 'PKR'),
      'pending', v_ref, p_payment_method, p_transaction_ref
    )
    returning id, receipt_reference, status, amount_paisa, currency;
end;
$$;

grant execute on function public.create_registration_payment(text, integer, text, text, text, text)
  to authenticated;

create or replace function public.confirm_registration_payment(
  p_receipt_reference text,
  p_transaction_ref text default null
)
returns table(id uuid, receipt_reference text, status text, amount_paisa integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_row registration_payments;
begin
  if v_user is null then
    raise exception 'authentication required';
  end if;
  if p_receipt_reference is null or length(trim(p_receipt_reference)) = 0 then
    raise exception 'receipt reference required';
  end if;

  select * into v_row
    from registration_payments
   where receipt_reference = trim(p_receipt_reference)
     and user_id = v_user
   for update;
  if v_row.id is null then
    raise exception 'payment not found';
  end if;
  if v_row.status = 'succeeded' then
    return query select v_row.id, v_row.receipt_reference, v_row.status, v_row.amount_paisa;
    return;
  end if;
  if v_row.status not in ('pending', 'processing') then
    raise exception 'payment cannot be confirmed';
  end if;

  update registration_payments
     set status = 'succeeded',
         transaction_ref = coalesce(p_transaction_ref, transaction_ref),
         confirmed_at = now()
   where id = v_row.id;

  update profiles
     set registration_fee_paid = true
   where id = v_user;

  return query
    select id, receipt_reference, status, amount_paisa
      from registration_payments where id = v_row.id;
end;
$$;

grant execute on function public.confirm_registration_payment(text, text)
  to authenticated;

create or replace function public.complete_customer_registration(
  p_session_key text,
  p_payload jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_full_name text := nullif(trim(coalesce(p_payload->>'fullName', '')), '');
  v_mobile text := nullif(trim(coalesce(p_payload->>'mobile', '')), '');
  v_city text := nullif(trim(coalesce(p_payload->>'city', '')), '');
  v_region text := nullif(trim(coalesce(p_payload->>'region', '')), '');
  v_address_line text := nullif(trim(coalesce(p_payload->>'addressLine', '')), '');
  v_paid boolean := coalesce((p_payload->>'paymentSucceeded')::boolean, false);
  v_payment_id uuid;
begin
  if v_user is null then
    raise exception 'authentication required';
  end if;
  if v_full_name is null then
    raise exception 'full name required';
  end if;

  insert into profiles (id, full_name, email, phone, role, registration_fee_paid)
  values (v_user, v_full_name, (select email from auth.users where id = v_user),
          v_mobile, 'customer', v_paid)
  on conflict (id) do update
    set full_name = excluded.full_name,
        phone = coalesce(excluded.phone, profiles.phone),
        role = 'customer',
        registration_fee_paid = profiles.registration_fee_paid or excluded.registration_fee_paid;

  if v_city is not null then
    insert into customer_addresses (customer_id, label, address_line, city, region, is_default)
    values (v_user, 'Primary', v_address_line, v_city, v_region, true);
  end if;

  if p_payload ? 'paymentReceiptReference'
     and (p_payload->>'paymentReceiptReference') is not null then
    select id into v_payment_id
      from registration_payments
     where receipt_reference = (p_payload->>'paymentReceiptReference')
       and user_id = v_user;
    if v_payment_id is not null then
      update registration_payments set account_type = 'customer' where id = v_payment_id;
    end if;
  end if;

  if p_session_key is not null then
    delete from registration_drafts
     where session_key = p_session_key
       and (user_id = v_user or user_id is null);
  end if;

  return jsonb_build_object('userId', v_user, 'role', 'customer', 'registrationFeePaid', v_paid);
end;
$$;

grant execute on function public.complete_customer_registration(text, jsonb)
  to authenticated;

create or replace function public.complete_provider_registration(
  p_session_key text,
  p_payload jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_full_name text := nullif(trim(coalesce(p_payload->>'fullName', '')), '');
  v_mobile text := nullif(trim(coalesce(p_payload->>'mobile', '')), '');
  v_business_name text := nullif(trim(coalesce(p_payload->>'businessName', '')), '');
  v_description text := nullif(trim(coalesce(p_payload->>'description', '')), '');
  v_city text := nullif(trim(coalesce(p_payload->>'city', '')), '');
  v_region text := nullif(trim(coalesce(p_payload->>'region', '')), '');
  v_starting_price integer := nullif(trim(coalesce(p_payload->>'startingPrice', '')), '')::integer;
  v_years integer := nullif(trim(coalesce(p_payload->>'yearsOfExperience', '')), '')::integer;
  v_website text := nullif(trim(coalesce(p_payload->>'website', '')), '');
  v_license text := nullif(trim(coalesce(p_payload->>'licenseNumber', '')), '');
  v_service_mode text := nullif(trim(coalesce(p_payload->>'serviceMode', '')), '');
  v_business_address text := nullif(trim(coalesce(p_payload->>'businessAddress', '')), '');
  v_document_type text := nullif(trim(coalesce(p_payload->>'documentType', '')), '');
  v_document_name text := nullif(trim(coalesce(p_payload->>'documentName', '')), '');
  v_paid boolean := coalesce((p_payload->>'paymentSucceeded')::boolean, false);
  v_svc_slug text;
  v_cat_id uuid;
begin
  if v_user is null then
    raise exception 'authentication required';
  end if;
  if v_full_name is null then
    raise exception 'full name required';
  end if;

  insert into profiles (id, full_name, email, phone, role, registration_fee_paid)
  values (v_user, v_full_name, (select email from auth.users where id = v_user),
          v_mobile, 'provider', v_paid)
  on conflict (id) do update
    set full_name = excluded.full_name,
        phone = coalesce(excluded.phone, profiles.phone),
        role = 'provider',
        registration_fee_paid = profiles.registration_fee_paid or excluded.registration_fee_paid;

  insert into provider_profiles (id, business_name, description, city, region, starting_price, is_verified)
  values (v_user, coalesce(v_business_name, v_full_name), v_description, v_city, v_region, v_starting_price, false)
  on conflict (id) do update
    set business_name = coalesce(excluded.business_name, provider_profiles.business_name),
        description = coalesce(excluded.description, provider_profiles.description),
        city = coalesce(excluded.city, provider_profiles.city),
        region = coalesce(excluded.region, provider_profiles.region),
        starting_price = coalesce(excluded.starting_price, provider_profiles.starting_price);

  if p_payload ? 'serviceSlugs' and jsonb_typeof(p_payload->'serviceSlugs') = 'array' then
    for v_svc_slug in select jsonb_array_elements_text(p_payload->'serviceSlugs') loop
      select id into v_cat_id from services where slug = v_svc_slug limit 1;
      if v_cat_id is not null then
        insert into provider_services (provider_id, service_id, is_active)
        values (v_user, v_cat_id, true)
        on conflict do nothing;
      end if;
    end loop;
  end if;

  insert into provider_verifications (provider_id, status, contact_verified)
  values (v_user, 'pending', false)
  on conflict do nothing;

  if v_document_type is not null or v_document_name is not null then
    insert into provider_documents (provider_id, document_type, file_url)
    values (v_user, coalesce(v_document_type, 'identity'), coalesce(v_document_name, ''));
  end if;

  if p_payload ? 'paymentReceiptReference'
     and (p_payload->>'paymentReceiptReference') is not null then
    update registration_payments
       set account_type = 'provider'
     where receipt_reference = (p_payload->>'paymentReceiptReference')
       and user_id = v_user;
  end if;

  if p_session_key is not null then
    delete from registration_drafts
     where session_key = p_session_key
       and (user_id = v_user or user_id is null);
  end if;

  return jsonb_build_object('userId', v_user, 'role', 'provider', 'registrationFeePaid', v_paid);
end;
$$;

grant execute on function public.complete_provider_registration(text, jsonb)
  to authenticated;

