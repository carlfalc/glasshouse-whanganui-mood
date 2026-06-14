-- Remove default PUBLIC execute and grant only to authenticated (required by RLS policies on team_members)
REVOKE EXECUTE ON FUNCTION public.is_coffee_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_coffee_admin() TO authenticated;