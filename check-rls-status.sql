-- Check RLS status for all FitConnect tables
-- Run this in Supabase SQL Editor

SELECT
  schemaname,
  tablename,
  CASE
    WHEN rowsecurity THEN '🔒 ENABLED'
    ELSE '🔓 DISABLED'
  END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('studios', 'instructors', 'classes', 'bookings', 'users', 'reviews', 'favorite_studios')
ORDER BY tablename;

-- Also show existing policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd as operation,
  CASE
    WHEN qual IS NOT NULL THEN 'Has USING clause'
    ELSE 'No USING clause'
  END as using_clause,
  CASE
    WHEN with_check IS NOT NULL THEN 'Has WITH CHECK clause'
    ELSE 'No WITH CHECK clause'
  END as with_check_clause
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
