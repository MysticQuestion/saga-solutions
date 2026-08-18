-- Saga Systems intake Data API access hardening
--
-- The intake tables are server-write-only. Browser roles receive no table access.
-- Explicit service_role grants support Supabase projects where newly created
-- public-schema tables are no longer exposed to the Data API by default.

alter table if exists public.project_leads enable row level security;
alter table if exists public.payment_events enable row level security;
alter table if exists public.project_intakes enable row level security;

revoke all privileges on table public.project_leads from anon, authenticated;
revoke all privileges on table public.payment_events from anon, authenticated;
revoke all privileges on table public.project_intakes from anon, authenticated;

grant select, insert, update, delete on table public.project_leads to service_role;
grant select, insert, update, delete on table public.payment_events to service_role;
grant select, insert, update, delete on table public.project_intakes to service_role;

comment on table public.project_intakes is
  'Saga Systems paid commissioning records. Server-side access only; no public Data API policies.';
