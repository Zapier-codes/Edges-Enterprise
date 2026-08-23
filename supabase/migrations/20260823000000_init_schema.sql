-- Edges Enterprise — initial Supabase schema
-- Mirrors the current Mongoose models (users, services, products, jobs, testimonials)

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'employee' check (role in ('admin','employee','client')),
  is_active boolean not null default true,
  image text default 'default.png',
  password_reset_token text,
  password_reset_token_expires timestamptz,
  last_changed_password timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null,
  image text,
  features jsonb not null default '[]'::jsonb,      -- [{ "name": "...", "description": "..." }]
  technologies text[] not null default '{}',
  avg_rating numeric(2,1) not null default 3.5 check (avg_rating between 1 and 5),
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null unique,
  url text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  responsibilities text[] not null,
  requirements text[] not null,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  review text not null,
  rating smallint not null check (rating between 1 and 5),
  user_id uuid not null references users(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists idx_testimonials_service on testimonials(service_id);
create index if not exists idx_testimonials_user on testimonials(user_id);

-- keep services.avg_rating in sync with testimonials, same as the old Mongoose post-save hook
create or replace function update_service_avg_rating() returns trigger
language plpgsql as $$
begin
  update services
  set avg_rating = coalesce(
    (select round(avg(rating)::numeric, 1) from testimonials
     where service_id = coalesce(new.service_id, old.service_id)),
    3.5
  )
  where id = coalesce(new.service_id, old.service_id);
  return null;
end;
$$;

drop trigger if exists trg_testimonial_avg_rating on testimonials;
create trigger trg_testimonial_avg_rating
after insert or update or delete on testimonials
for each row execute function update_service_avg_rating();

-- Row Level Security: the API connects with the service/db role and bypasses RLS,
-- these policies only matter if the anon key is ever used directly (e.g. from the frontend).
alter table services enable row level security;
alter table products enable row level security;
alter table jobs enable row level security;
alter table testimonials enable row level security;
alter table users enable row level security;

drop policy if exists "public read services" on services;
create policy "public read services" on services for select using (true);

drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (true);

drop policy if exists "public read testimonials" on testimonials;
create policy "public read testimonials" on testimonials for select using (true);

-- jobs and users are staff/portal-only data — no public policy, so anon key gets nothing back.
