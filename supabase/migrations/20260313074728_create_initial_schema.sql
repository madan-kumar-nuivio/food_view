-- ============================================================
-- Migration: Initial schema for CRAVEAT food delivery dashboard
-- ============================================================

-- ------------------------------------------------------------
-- 1. EXTENSIONS
-- ------------------------------------------------------------
create extension if not exists "pg_trgm";

-- ------------------------------------------------------------
-- 2. CUSTOM ENUM TYPES
-- ------------------------------------------------------------
create type order_status as enum ('Delivered', 'On Delivery', 'Cancelled');
create type customer_status as enum ('Active', 'Inactive', 'New');

-- ------------------------------------------------------------
-- 3. CORE ENTITY TABLES
-- ------------------------------------------------------------

-- Customers --------------------------------------------------
create table customers (
    id          uuid primary key default gen_random_uuid(),
    name        text        not null,
    avatar      text,
    email       text        not null unique,
    phone       text,
    location    text,
    total_orders integer    not null default 0 check (total_orders >= 0),
    total_spent numeric(12,2) not null default 0 check (total_spent >= 0),
    status      customer_status not null default 'New',
    join_date   date        not null default current_date,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- Orders -----------------------------------------------------
create table orders (
    id          uuid primary key default gen_random_uuid(),
    order_code  text        not null unique,
    customer_id uuid        not null references customers(id) on delete cascade,
    payment     text        not null,
    location    text,
    status      order_status not null default 'On Delivery',
    contact     text,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 4. CHAT TABLES
-- ------------------------------------------------------------

-- Chat profiles (1:1 extension of customers) ----------------
create table chat_profiles (
    customer_id uuid primary key references customers(id) on delete cascade,
    online      boolean     not null default false,
    last_message text,
    last_message_at timestamptz,
    unread_count integer    not null default 0 check (unread_count >= 0),
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- Chat messages ----------------------------------------------
create table chat_messages (
    id              uuid primary key default gen_random_uuid(),
    conversation_id uuid        not null references customers(id) on delete cascade,
    sender_id       text        not null,
    body            text        not null,
    is_own          boolean     not null default false,
    sent_at         timestamptz not null default now(),
    created_at      timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 5. DASHBOARD CONFIGURATION TABLES
-- ------------------------------------------------------------

-- Stat cards (KPI tiles) ------------------------------------
create table stat_cards (
    id          uuid primary key default gen_random_uuid(),
    stat_key    text        not null unique,
    label       text        not null,
    value       text        not null,
    icon        text        not null,
    trend       text,
    trend_up    boolean,
    sort_order  smallint    not null default 0,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- Order summary (status breakdown for progress rings) -------
create table order_summary (
    id          uuid primary key default gen_random_uuid(),
    label       text        not null,
    value       integer     not null default 0 check (value >= 0),
    total       integer     not null default 0 check (total >= 0),
    color       text        not null,
    sort_order  smallint    not null default 0,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- Overview (donut chart slices) -----------------------------
create table overview_slices (
    id          uuid primary key default gen_random_uuid(),
    name        text        not null,
    value       integer     not null default 0 check (value >= 0),
    color       text        not null,
    sort_order  smallint    not null default 0,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- Top selling items -----------------------------------------
create table top_selling_items (
    id          uuid primary key default gen_random_uuid(),
    name        text        not null,
    price       text        not null,
    image       text,
    sort_order  smallint    not null default 0,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- Customer map (weekly comparison chart) --------------------
create table customer_map (
    id          uuid primary key default gen_random_uuid(),
    day         text        not null,
    this_week   integer     not null default 0 check (this_week >= 0),
    last_week   integer     not null default 0 check (last_week >= 0),
    sort_order  smallint    not null default 0,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- Revenue (monthly chart) -----------------------------------
create table revenue (
    id          uuid primary key default gen_random_uuid(),
    month       text        not null,
    revenue     numeric(14,2) not null default 0 check (revenue >= 0),
    sort_order  smallint    not null default 0,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 6. INDEXES
-- ------------------------------------------------------------
create index idx_customers_email   on customers (email);
create index idx_customers_status  on customers (status);
create index idx_customers_name    on customers using gin (name gin_trgm_ops);

create index idx_orders_customer   on orders (customer_id);
create index idx_orders_status     on orders (status);
create index idx_orders_created    on orders (created_at desc);

create index idx_chat_messages_conversation on chat_messages (conversation_id, sent_at desc);
create index idx_chat_messages_sender       on chat_messages (sender_id);

create index idx_stat_cards_sort     on stat_cards (sort_order);
create index idx_order_summary_sort  on order_summary (sort_order);
create index idx_overview_sort       on overview_slices (sort_order);
create index idx_top_selling_sort    on top_selling_items (sort_order);
create index idx_customer_map_sort   on customer_map (sort_order);
create index idx_revenue_sort        on revenue (sort_order);

-- ------------------------------------------------------------
-- 7. UPDATED_AT TRIGGER
-- ------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

do $$
declare
    t text;
begin
    for t in
        select unnest(array[
            'customers', 'orders', 'chat_profiles', 'stat_cards',
            'order_summary', 'overview_slices', 'top_selling_items',
            'customer_map', 'revenue'
        ])
    loop
        execute format(
            'create trigger trg_%s_updated_at
             before update on %I
             for each row execute function set_updated_at()',
            t, t
        );
    end loop;
end;
$$;

-- ------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (permissive read for anon + authenticated)
-- ------------------------------------------------------------
alter table customers        enable row level security;
alter table orders           enable row level security;
alter table chat_profiles    enable row level security;
alter table chat_messages    enable row level security;
alter table stat_cards       enable row level security;
alter table order_summary    enable row level security;
alter table overview_slices  enable row level security;
alter table top_selling_items enable row level security;
alter table customer_map     enable row level security;
alter table revenue          enable row level security;

do $$
declare
    t text;
begin
    for t in
        select unnest(array[
            'customers', 'orders', 'chat_profiles', 'chat_messages',
            'stat_cards', 'order_summary', 'overview_slices',
            'top_selling_items', 'customer_map', 'revenue'
        ])
    loop
        execute format(
            'create policy "Allow public read on %s"
             on %I for select
             to anon, authenticated
             using (true)',
            t, t
        );
        execute format(
            'create policy "Allow service write on %s"
             on %I for all
             to service_role
             using (true)
             with check (true)',
            t, t
        );
    end loop;
end;
$$;

-- ------------------------------------------------------------
-- 9. CONVENIENCE VIEWS
-- ------------------------------------------------------------
create view orders_with_customer as
select
    o.id,
    o.order_code,
    o.customer_id,
    c.name        as customer_name,
    c.avatar      as customer_avatar,
    o.payment,
    o.location,
    o.status,
    o.contact,
    o.created_at,
    o.updated_at
from orders o
join customers c on c.id = o.customer_id;

create view chat_users_view as
select
    c.id,
    c.name,
    c.avatar,
    cp.last_message,
    cp.last_message_at,
    cp.unread_count,
    cp.online,
    cp.created_at
from customers c
join chat_profiles cp on cp.customer_id = c.id;
