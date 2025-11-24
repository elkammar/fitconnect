-- Add SELECT policies to allow reading classes, studios, and instructors
-- Run this in Supabase SQL Editor

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view active studios" ON public.studios;
DROP POLICY IF EXISTS "Anyone can view active instructors" ON public.instructors;
DROP POLICY IF EXISTS "Anyone can view active classes" ON public.classes;

-- Recreate SELECT policies

-- Studios: Anyone can view active studios
CREATE POLICY "Anyone can view active studios"
  ON public.studios
  FOR SELECT
  USING (is_active = true OR owner_id = auth.uid());

-- Instructors: Anyone can view active instructors
CREATE POLICY "Anyone can view active instructors"
  ON public.instructors
  FOR SELECT
  USING (
    is_active = true
    OR user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = instructors.studio_id
      AND owner_id = auth.uid()
    )
  );

-- Classes: Anyone can view active classes
CREATE POLICY "Anyone can view active classes"
  ON public.classes
  FOR SELECT
  USING (
    is_active = true
    OR EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = classes.studio_id
      AND owner_id = auth.uid()
    )
  );

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('studios', 'instructors', 'classes')
ORDER BY tablename, policyname;
