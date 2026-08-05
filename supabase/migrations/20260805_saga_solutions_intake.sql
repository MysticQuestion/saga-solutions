-- Saga Solutions revenue-ready intake schema
-- Apply with Supabase SQL editor or CLI before enabling the production forms.

create extension if not exists pgcrypto;

create table if not exists public.project_leads (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  name text not null,
  email text not null,
  phone text,
  organization text,
  project_title text not null,
  project_summary text not null,
  budget text,
  timeline text,
  package_id text,
  package_name text,
  source text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  reference text not null,
  package_id text,
  package_name text,
  customer_name text,
  customer_email text,
  project_title text,
  amount_total integer not null default 0,
  currency text not null default 'usd',
  payment_status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_intakes (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  payment_status text not null,
  amount_total integer not null default 0,
  currency text not null default 'usd',
  package_id text,
  package_name text,
  customer_name text,
  customer_email text,
  customer_phone text,
  organization text,
  project_title text,
  project_summary text,
  budget text,
  timeline text,
  desired_outcome text not null,
  primary_users text not null,
  required_features text not null,
  reference_links text,
  existing_assets text,
  integrations text,
  success_measures text not null,
  constraints text,
  decision_makers text,
  target_launch date,
  status text not null default 'paid_intake_received',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_leads_created_at_idx
  on public.project_leads (created_at desc);

create index if not exists project_leads_status_idx
  on public.project_leads (status);

create index if not exists payment_events_created_at_idx
  on public.payment_events (created_at desc);

create index if not exists project_intakes_created_at_idx
  on public.project_intakes (created_at desc);

create index if not exists project_intakes_status_idx
  on public.project_intakes (status);

alter table public.project_leads enable row level security;
alter table public.payment_events enable row level security;
alter table public.project_intakes enable row level security;

-- Deliberately no anonymous or authenticated-user policies.
-- The Vercel serverless functions write through the Supabase service role.
-- Add a separate authenticated coordinator dashboard and explicit read policies later.
