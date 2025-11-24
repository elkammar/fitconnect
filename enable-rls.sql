-- Re-enable RLS after seeding is complete
-- Run this in Supabase SQL Editor AFTER seeding succeeds

ALTER TABLE public.studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
