-- Temporarily disable RLS for seeding
-- Run this in Supabase SQL Editor BEFORE clicking "Seed Database"

ALTER TABLE public.studios DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes DISABLE ROW LEVEL SECURITY;

-- After seeding is complete, run enable-rls.sql to re-enable security
