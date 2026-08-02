-- Paper-Cut Folio — Supabase setup script
--
-- The image upload feature fails with HTTP 400 because the `projects` storage
-- bucket does not exist yet and `storage.objects` has no Row Level Security
-- (RLS) policies allowing the admin to write.
--
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New query → Run.
-- It is idempotent (safe to re-run).

-- 1) Create the public `projects` bucket
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do nothing;

-- 2) Allow the authenticated admin to upload / update / delete images
drop policy if exists "Authenticated users can upload project images" on storage.objects;
create policy "Authenticated users can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'projects');

drop policy if exists "Authenticated users can update project images" on storage.objects;
create policy "Authenticated users can update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'projects');

drop policy if exists "Authenticated users can delete project images" on storage.objects;
create policy "Authenticated users can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'projects');

-- 3) Allow public read access (bucket is public, images render on the site)
drop policy if exists "Public read access to project images" on storage.objects;
create policy "Public read access to project images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'projects');

-- 4) Let the authenticated admin list buckets
drop policy if exists "Authenticated users can list buckets" on storage.buckets;
create policy "Authenticated users can list buckets"
  on storage.buckets for select
  to authenticated
  using (true);
