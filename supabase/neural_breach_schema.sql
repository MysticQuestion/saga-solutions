-- ============================================
-- NEURAL BREACH - Full Database Schema
-- Mad Evil Genius shop branch for Saga Solutions
-- ============================================

create extension if not exists "uuid-ossp";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  price numeric(10,2) not null,
  status text not null check (status in ('ACTIVE', 'CONTAINMENT FAILED', 'LIMITED', 'ARCHIVED')),
  category text not null check (category in ('experiment', 'breach', 'classified', 'vault')),
  description text,
  lore text,
  images jsonb default '[]'::jsonb,
  metadata jsonb default '{}'::jsonb,
  is_limited boolean default false,
  drop_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists products_status_idx on products(status);
create index if not exists products_category_idx on products(category);
create index if not exists products_is_limited_idx on products(is_limited);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  access_level text default 'citizen' check (access_level in ('citizen', 'operative', 'breacher', 'admin')),
  created_at timestamptz default now()
);

create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  quantity integer default 1 check (quantity > 0),
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'completed', 'cancelled')),
  total numeric(10,2) not null,
  shipping_address jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer not null,
  price_at_purchase numeric(10,2) not null,
  created_at timestamptz default now()
);

create table if not exists breach_logs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  category text default 'log' check (category in ('log', 'experiment', 'report', 'classified')),
  status text default 'published' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists drops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  start_date timestamptz not null,
  end_date timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists drop_products (
  drop_id uuid references drops(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  primary key (drop_id, product_id)
);

create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists collection_products (
  collection_id uuid references collections(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  primary key (collection_id, product_id)
);

alter table products enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table profiles enable row level security;

create policy "Public can view products" on products for select using (true);
create policy "Users can manage their own cart" on cart_items for all using (auth.uid() = user_id);
create policy "Users can view their own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can view their own profile" on profiles for select using (auth.uid() = id);

create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_products_updated_at before update on products for each row execute function update_updated_at_column();
create trigger update_orders_updated_at before update on orders for each row execute function update_updated_at_column();
create trigger update_breach_logs_updated_at before update on breach_logs for each row execute function update_updated_at_column();
