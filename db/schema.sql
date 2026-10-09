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

alter table registrations drop constraint if exists registrations_title_check;
alter table registrations add constraint registrations_title_check
  check (title in ('Mr', 'Mrs', 'Miss', 'Ms', 'Pastor', 'Rev', 'Minister'));

alter table registrations drop constraint if exists registrations_name_check;
alter table registrations add constraint registrations_name_check
  check (char_length(name) between 2 and 100 and name = btrim(name));

alter table registrations drop constraint if exists registrations_email_check;
alter table registrations add constraint registrations_email_check
  check (char_length(email) <= 254 and email = lower(email) and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$');

alter table registrations drop constraint if exists registrations_phone_check;
alter table registrations add constraint registrations_phone_check
  check (phone ~ '^\+[1-9][0-9]{6,14}$');

alter table registrations drop constraint if exists registrations_assembly_check;
alter table registrations add constraint registrations_assembly_check
  check (char_length(assembly) between 2 and 120);

alter table registrations drop constraint if exists registrations_heard_check;
alter table registrations add constraint registrations_heard_check
  check (heard in ('Church Service', 'Friend/Colleague', 'Social Media', 'Evangelism'));

alter table registrations drop constraint if exists registrations_joining_check;
alter table registrations add constraint registrations_joining_check
  check (joining in ('Online', 'In-Person'));

alter table registrations drop constraint if exists registrations_location_check;
alter table registrations add constraint registrations_location_check
  check (char_length(location) between 2 and 120);

alter table registrations drop constraint if exists registrations_days_check;
alter table registrations add constraint registrations_days_check
  check (days in ('Saturday', 'Sunday', 'Both'));

alter table registrations drop constraint if exists registrations_expectations_check;
alter table registrations add constraint registrations_expectations_check
  check (expectations is null or char_length(expectations) between 1 and 1000);

create unique index if not exists registrations_email_name_key
  on registrations (email, lower(name));

create index if not exists registrations_created_at_idx
  on registrations (created_at desc);
