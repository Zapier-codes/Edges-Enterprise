-- Public buckets for images that used to be written to local disk (public/images/...),
-- which doesn't persist on Vercel's serverless filesystem between deploys/invocations.

insert into storage.buckets (id, name, public)
values ('service-images', 'service-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('user-images', 'user-images', true)
on conflict (id) do nothing;

-- Uploads go through the API using the service-role key, which bypasses RLS —
-- these policies only cover public read access (e.g. a browser loading the image directly).
drop policy if exists "public read service-images" on storage.objects;
create policy "public read service-images" on storage.objects
for select using (bucket_id = 'service-images');

drop policy if exists "public read user-images" on storage.objects;
create policy "public read user-images" on storage.objects
for select using (bucket_id = 'user-images');
