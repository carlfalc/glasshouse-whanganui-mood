CREATE SCHEMA IF NOT EXISTS app_private;

CREATE OR REPLACE FUNCTION app_private.is_coffee_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.coffee_admin_users
    WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

REVOKE ALL ON FUNCTION app_private.is_coffee_admin() FROM PUBLIC;
REVOKE ALL ON SCHEMA app_private FROM PUBLIC;

DROP POLICY IF EXISTS "Users can view their own admin access" ON public.coffee_admin_users;
DROP POLICY IF EXISTS "Coffee admins can add admin users" ON public.coffee_admin_users;
DROP POLICY IF EXISTS "Coffee admins can update admin users" ON public.coffee_admin_users;
DROP POLICY IF EXISTS "Coffee admins can delete admin users" ON public.coffee_admin_users;

CREATE POLICY "Users can view their own admin access"
ON public.coffee_admin_users
FOR SELECT
TO authenticated
USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')) OR app_private.is_coffee_admin());

CREATE POLICY "Coffee admins can add admin users"
ON public.coffee_admin_users
FOR INSERT
TO authenticated
WITH CHECK (app_private.is_coffee_admin());

CREATE POLICY "Coffee admins can update admin users"
ON public.coffee_admin_users
FOR UPDATE
TO authenticated
USING (app_private.is_coffee_admin())
WITH CHECK (app_private.is_coffee_admin());

CREATE POLICY "Coffee admins can delete admin users"
ON public.coffee_admin_users
FOR DELETE
TO authenticated
USING (app_private.is_coffee_admin());

DROP POLICY IF EXISTS "Coffee admins can insert cafe settings" ON public.cafe_settings;
DROP POLICY IF EXISTS "Coffee admins can update cafe settings" ON public.cafe_settings;
CREATE POLICY "Coffee admins can insert cafe settings"
ON public.cafe_settings
FOR INSERT
TO authenticated
WITH CHECK (app_private.is_coffee_admin());
CREATE POLICY "Coffee admins can update cafe settings"
ON public.cafe_settings
FOR UPDATE
TO authenticated
USING (app_private.is_coffee_admin())
WITH CHECK (app_private.is_coffee_admin());

DROP POLICY IF EXISTS "Coffee admins can insert menu items" ON public.menu_items;
DROP POLICY IF EXISTS "Coffee admins can update menu items" ON public.menu_items;
DROP POLICY IF EXISTS "Coffee admins can delete menu items" ON public.menu_items;
CREATE POLICY "Coffee admins can insert menu items"
ON public.menu_items
FOR INSERT
TO authenticated
WITH CHECK (app_private.is_coffee_admin());
CREATE POLICY "Coffee admins can update menu items"
ON public.menu_items
FOR UPDATE
TO authenticated
USING (app_private.is_coffee_admin())
WITH CHECK (app_private.is_coffee_admin());
CREATE POLICY "Coffee admins can delete menu items"
ON public.menu_items
FOR DELETE
TO authenticated
USING (app_private.is_coffee_admin());

DROP POLICY IF EXISTS "Coffee admins can insert menu options" ON public.menu_options;
DROP POLICY IF EXISTS "Coffee admins can update menu options" ON public.menu_options;
DROP POLICY IF EXISTS "Coffee admins can delete menu options" ON public.menu_options;
CREATE POLICY "Coffee admins can insert menu options"
ON public.menu_options
FOR INSERT
TO authenticated
WITH CHECK (app_private.is_coffee_admin());
CREATE POLICY "Coffee admins can update menu options"
ON public.menu_options
FOR UPDATE
TO authenticated
USING (app_private.is_coffee_admin())
WITH CHECK (app_private.is_coffee_admin());
CREATE POLICY "Coffee admins can delete menu options"
ON public.menu_options
FOR DELETE
TO authenticated
USING (app_private.is_coffee_admin());

DROP POLICY IF EXISTS "Coffee admins can update orders" ON public.coffee_orders;
CREATE POLICY "Coffee admins can update orders"
ON public.coffee_orders
FOR UPDATE
TO authenticated
USING (app_private.is_coffee_admin())
WITH CHECK (app_private.is_coffee_admin());

DROP FUNCTION IF EXISTS public.is_coffee_admin();