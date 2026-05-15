
CREATE OR REPLACE FUNCTION app_private.is_coffee_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    lower(coalesce(auth.jwt() ->> 'email', '')) = 'staff@glasshouse-coffee.local'
    OR EXISTS (
      SELECT 1 FROM public.coffee_admin_users
      WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$function$;

GRANT USAGE ON SCHEMA app_private TO authenticated, anon;
GRANT EXECUTE ON FUNCTION app_private.is_coffee_admin() TO authenticated, anon;
