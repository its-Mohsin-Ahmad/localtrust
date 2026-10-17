-- LocalTrust Initial Database Schema
-- This migration creates all core tables for the LocalTrust service marketplace.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- Profiles (extends Supabase Auth users)
-- ============================================
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'provider', 'admin')),
  avatar_url text,
  email_verified boolean default false,
  phone_verified boolean default false,
  registration_fee_paid boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- Locations (Pakistan regions, cities, localities)
-- ============================================
create table locations (
  id uuid default uuid_generate_v4() primary key,
  region text not null,
  city text not null,
  locality text,
  slug text not null unique,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- Service Categories
-- ============================================
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_key text,
  parent_id uuid references categories(id),
  provider_count integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- Services
-- ============================================
create table services (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  pricing_model text check (pricing_model in ('fixed', 'hourly', 'starting', 'quote')),
  base_price integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- Provider Profiles
-- ============================================
create table provider_profiles (
  id uuid references profiles(id) on delete cascade primary key,
  business_name text,
  primary_category_id uuid references categories(id),
  description text,
  city text,
  region text,
  service_areas text[] default '{}',
  hourly_rate integer,
  fixed_price integer,
  starting_price integer,
  inspection_fee integer,
  rating numeric(3,2) default 0,
  review_count integer default 0,
  verified boolean default false,
  avatar_url text,
  logo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- Provider Services (junction)
-- ============================================
create table provider_services (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references provider_profiles(id) on delete cascade,
  service_id uuid references services(id) on delete cascade,
  price integer,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================
-- Provider Availability
-- ============================================
create table provider_availability (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references provider_profiles(id) on delete cascade,
  day_of_week integer check (day_of_week between 0 and 6),
  start_time time,
  end_time time,
  is_available boolean default true,
  created_at timestamptz default now()
);

-- ============================================
-- Bookings
-- ============================================
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references profiles(id) on delete cascade,
  provider_id uuid references provider_profiles(id) on delete cascade,
  service_id uuid references services(id),
  category_id uuid references categories(id),
  status text default 'requested' check (status in ('requested', 'accepted', 'declined', 'reschedule_requested', 'confirmed', 'in_progress', 'completed', 'cancelled', 'disputed')),
  location text,
  scheduled_at timestamptz,
  description text,
  amount integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- Booking Status History
-- ============================================
create table booking_status_history (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id) on delete cascade,
  status text not null,
  changed_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- ============================================
-- Booking Quotations
-- ============================================
create table booking_quotations (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id) on delete cascade,
  provider_id uuid references provider_profiles(id) on delete cascade,
  description text,
  amount integer,
  status text default 'pending' check (status in ('pending', 'accepted', 'rejected', 'expired')),
  valid_until timestamptz,
  created_at timestamptz default now()
);

-- ============================================
-- Booking Reviews
-- ============================================
create table booking_reviews (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id) on delete cascade unique,
  customer_id uuid references profiles(id) on delete cascade,
  provider_id uuid references provider_profiles(id) on delete cascade,
  rating integer check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- ============================================
-- Saved Providers
-- ============================================
create table saved_providers (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references profiles(id) on delete cascade,
  provider_id uuid references provider_profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique (customer_id, provider_id)
);

-- ============================================
-- Registration Payments
-- ============================================
create table registration_payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  account_type text check (account_type in ('customer', 'provider')),
  amount_paisa integer not null,
  currency text default 'PKR',
  status text default 'pending' check (status in ('pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refund_pending', 'refunded')),
  payment_method text,
  transaction_ref text,
  receipt_reference text not null unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- Payment Events
-- ============================================
create table payment_events (
  id uuid default uuid_generate_v4() primary key,
  registration_payment_id uuid references registration_payments(id) on delete cascade,
  event_type text,
  raw_payload jsonb,
  created_at timestamptz default now()w
);

-- ============================================
-- Refund Requests
-- ============================================
create table refund_requests (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id) on delete cascade,
  registration_payment_id uuid references registration_payments(id),
  amount_paisa integer,
  reason text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'processed')),
  created_at timestamptz default now()
);

-- ============================================
-- Conversations
-- ============================================
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id),
  created_at timestamptz default now()
);

-- ============================================
-- Conversation Participants
-- ============================================
create table conversation_participants (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  unique (conversation_id, user_id)
);
-- ============================================
-- Messages
-- ============================================
create table messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations(id) on delete cascade,
  sender_id uuid references profiles(id) on delete cascade,
  body text,
  created_at timestamptz default now()
);

-- ============================================
-- Notifications
-- ============================================
create table notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  type text,
  title text,
  body text,
  read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- Disputes
-- ============================================
create table disputes (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id) on delete cascade,
  raised_by uuid references profiles(id),
  reason text,
  status text default 'open' check (status in ('open', 'in_review', 'resolved', 'closed')),
  created_at timestamptz default now()
);

-- ============================================
-- Support Tickets
-- ============================================
create table support_tickets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  subject text,
  status text default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz default now()
);

-- ============================================
-- Audit Logs
-- ============================================
create table audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  action text,
  table_name text,
  record_id text,
  old_values jsonb,
  new_values jsonb,
  created_at timestamptz default now()
);
-- ============================================
-- Site Settings
-- ============================================
create table site_settings (
  id uuid default uuid_generate_v4() primary key,
  key text not null unique,
  value jsonb,
  updated_at timestamptz default now()
);

-- ============================================
-- Announcements
-- ============================================
create table announcements (
  id uuid default uuid_generate_v4() primary key,
  title text,
  body text,
  active boolean default true,
  created_at timestamptz default now()
);

-- ============================================
-- Customer Addresses
-- ============================================
create table customer_addresses (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references profiles(id) on delete cascade,
  label text,
  address_line text,
  city text,
  region text,
  is_default boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- Provider Verifications
-- ============================================
create table provider_verifications (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references provider_profiles(id) on delete cascade,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'additional_info_required')),
  contact_verified boolean default false,
  identity_verified boolean default false,
  business_verified boolean default false,
  qualification_verified boolean default false,
  submitted_at timestamptz default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references profiles(id)
);

-- ============================================
-- Provider Documents
-- ============================================
create table provider_documents (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references provider_profiles(id) on delete cascade,
  document_type text,
  file_url text,
  verified boolean default false,
  uploaded_at timestamptz default now()
);

-- ============================================
-- Indexes
-- ============================================
create index idx_profiles_role on profiles(role);
create index idx_categories_slug on categories(slug);
create index idx_categories_parent on categories(parent_id);
create index idx_locations_slug on locations(slug);
create index idx_locations_region_city on locations(region, city);
create index idx_services_category on services(category_id);
create index idx_bookings_customer on bookings(customer_id);
create index idx_bookings_provider on bookings(provider_id);
create index idx_bookings_status on bookings(status);
create index idx_registration_payments_user on registration_payments(user_id);
create index idx_notifications_user on notifications(user_id);
create index idx_messages_conversation on messages(conversation_id);

-- ============================================
-- Row Level Security
-- ============================================
alter table profiles enable row level security;
alter table locations enable row level security;
alter table categories enable row level security;
alter table services enable row level security;
alter table provider_profiles enable row level security;
alter table provider_services enable row level security;
alter table provider_availability enable row level security;
alter table bookings enable row level security;
alter table booking_status_history enable row level security;
alter table booking_quotations enable row level security;
alter table booking_reviews enable row level security;
alter table saved_providers enable row level security;
alter table registration_payments enable row level security;
alter table payment_events enable row level security;
alter table refund_requests enable row level security;
alter table conversations enable row level security;
alter table conversation_participants enable row level security;
alter table messages enable row level security;
alter table notifications enable row level security;
alter table disputes enable row level security;
alter table support_tickets enable row level security;
alter table audit_logs enable row level security;
alter table site_settings enable row level security;
alter table announcements enable row level security;
alter table customer_addresses enable row level security;
alter table provider_verifications enable row level security;
alter table provider_documents enable row level security;

-- ============================================
-- RLS Policies: Profiles
-- ============================================
create policy "Public profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- ============================================
-- RLS Policies: Locations
-- ============================================
create policy "Locations are viewable by everyone" on locations
  for select using (true);

-- ============================================
-- RLS Policies: Categories
-- ============================================
create policy "Categories are viewable by everyone" on categories
  for select using (true);

-- ============================================
-- RLS Policies: Services
-- ============================================
create policy "Services are viewable by everyone" on services
  for select using (true);

-- ============================================
-- RLS Policies: Provider Profiles
-- ============================================
create policy "Provider profiles are viewable by everyone" on provider_profiles
  for select using (true);

create policy "Providers can update own profile" on provider_profiles
  for update using (auth.uid() = id);

-- ============================================
-- RLS Policies: Bookings
-- ============================================
create policy "Customers can view own bookings" on bookings
  for select using (auth.uid() = customer_id);

create policy "Providers can view own bookings" on bookings
  for select using (auth.uid() = provider_id);

create policy "Customers can create bookings" on bookings
  for insert with check (auth.uid() = customer_id);

create policy "Providers can update own bookings" on bookings
  for update using (auth.uid() = provider_id);

-- ============================================
-- RLS Policies: Registration Payments
-- ============================================
create policy "Users can view own registration payments" on registration_payments
  for select using (auth.uid() = user_id);

create policy "Users can insert own registration payments" on registration_payments
  for insert with check (auth.uid() = user_id);

-- ============================================
-- RLS Policies: Messages
-- ============================================
create policy "Participants can view conversation messages" on messages
  for select using (
    exists (
      select 1 from conversation_participants cp
      where cp.conversation_id = messages.conversation_id
        and cp.user_id = auth.uid()
    )
  );

create policy "Participants can insert messages" on messages
  for insert with check (
    exists (
      select 1 from conversation_participants cp
      where cp.conversation_id = messages.conversation_id
        and cp.user_id = auth.uid()
    )
  );

-- ============================================
-- RLS Policies: Notifications
-- ============================================
create policy "Users can view own notifications" on notifications
  for select using (auth.uid() = user_id);

create policy "Users can update own notifications" on notifications
  for update using (auth.uid() = user_id);

-- ============================================
-- RLS Policies: Saved Providers
-- ============================================
create policy "Customers can view own saved providers" on saved_providers
  for select using (auth.uid() = customer_id);

create policy "Customers can manage own saved providers" on saved_providers
  for all using (auth.uid() = customer_id);

-- ============================================
-- RLS Policies: Reviews
-- ============================================
create policy "Reviews are viewable by everyone" on booking_reviews
  for select using (true);

create policy "Customers can create reviews" on booking_reviews
  for insert with check (auth.uid() = customer_id);

-- ============================================
-- RLS Policies: Admin
-- ============================================
-- Admin operations performed via service-role key in server code, bypassing RLS.
