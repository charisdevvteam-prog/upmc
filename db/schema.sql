create table if not exists registrations (
  id bigint generated always as identity primary key,
  title text not null,
  name text not null,
  email text not null,
  phone text not null,
  assembly text not null,
  heard text not null,
  joining text not null,
  location text not null,
  days text not null,
  expectations text,
  created_at timestamptz not null default now()
);

create index if not exists registrations_created_at_idx
  on registrations (created_at desc);
