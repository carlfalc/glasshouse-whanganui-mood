CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.coffee_admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  display_name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.coffee_admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_coffee_admin()
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

DROP TRIGGER IF EXISTS update_coffee_admin_users_updated_at ON public.coffee_admin_users;
CREATE TRIGGER update_coffee_admin_users_updated_at
BEFORE UPDATE ON public.coffee_admin_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP POLICY IF EXISTS "Coffee admins can view admin users" ON public.coffee_admin_users;
DROP POLICY IF EXISTS "Coffee admins can add admin users" ON public.coffee_admin_users;
DROP POLICY IF EXISTS "Coffee admins can update admin users" ON public.coffee_admin_users;
DROP POLICY IF EXISTS "Coffee admins can delete admin users" ON public.coffee_admin_users;
DROP POLICY IF EXISTS "Users can view their own admin access" ON public.coffee_admin_users;

CREATE POLICY "Users can view their own admin access"
ON public.coffee_admin_users
FOR SELECT
TO authenticated
USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')) OR public.is_coffee_admin());

CREATE POLICY "Coffee admins can add admin users"
ON public.coffee_admin_users
FOR INSERT
TO authenticated
WITH CHECK (public.is_coffee_admin());

CREATE POLICY "Coffee admins can update admin users"
ON public.coffee_admin_users
FOR UPDATE
TO authenticated
USING (public.is_coffee_admin())
WITH CHECK (public.is_coffee_admin());

CREATE POLICY "Coffee admins can delete admin users"
ON public.coffee_admin_users
FOR DELETE
TO authenticated
USING (public.is_coffee_admin());

INSERT INTO public.coffee_admin_users (email, display_name)
VALUES ('falconercarlandrew@gmail.com', 'Andrew')
ON CONFLICT (email) DO UPDATE SET display_name = EXCLUDED.display_name;

DROP POLICY IF EXISTS "Authenticated can insert cafe settings" ON public.cafe_settings;
DROP POLICY IF EXISTS "Authenticated can update cafe settings" ON public.cafe_settings;
CREATE POLICY "Coffee admins can insert cafe settings"
ON public.cafe_settings
FOR INSERT
TO authenticated
WITH CHECK (public.is_coffee_admin());
CREATE POLICY "Coffee admins can update cafe settings"
ON public.cafe_settings
FOR UPDATE
TO authenticated
USING (public.is_coffee_admin())
WITH CHECK (public.is_coffee_admin());

DROP POLICY IF EXISTS "Authenticated can insert menu items" ON public.menu_items;
DROP POLICY IF EXISTS "Authenticated can update menu items" ON public.menu_items;
DROP POLICY IF EXISTS "Authenticated can delete menu items" ON public.menu_items;
CREATE POLICY "Coffee admins can insert menu items"
ON public.menu_items
FOR INSERT
TO authenticated
WITH CHECK (public.is_coffee_admin());
CREATE POLICY "Coffee admins can update menu items"
ON public.menu_items
FOR UPDATE
TO authenticated
USING (public.is_coffee_admin())
WITH CHECK (public.is_coffee_admin());
CREATE POLICY "Coffee admins can delete menu items"
ON public.menu_items
FOR DELETE
TO authenticated
USING (public.is_coffee_admin());

DROP POLICY IF EXISTS "Authenticated can insert menu options" ON public.menu_options;
DROP POLICY IF EXISTS "Authenticated can update menu options" ON public.menu_options;
DROP POLICY IF EXISTS "Authenticated can delete menu options" ON public.menu_options;
CREATE POLICY "Coffee admins can insert menu options"
ON public.menu_options
FOR INSERT
TO authenticated
WITH CHECK (public.is_coffee_admin());
CREATE POLICY "Coffee admins can update menu options"
ON public.menu_options
FOR UPDATE
TO authenticated
USING (public.is_coffee_admin())
WITH CHECK (public.is_coffee_admin());
CREATE POLICY "Coffee admins can delete menu options"
ON public.menu_options
FOR DELETE
TO authenticated
USING (public.is_coffee_admin());

DROP POLICY IF EXISTS "Authenticated can update orders" ON public.coffee_orders;
CREATE POLICY "Coffee admins can update orders"
ON public.coffee_orders
FOR UPDATE
TO authenticated
USING (public.is_coffee_admin())
WITH CHECK (public.is_coffee_admin());