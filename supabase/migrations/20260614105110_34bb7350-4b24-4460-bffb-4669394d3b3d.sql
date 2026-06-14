-- Ensure pgcrypto is available for hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- 1) Restrict coffee_orders reads to coffee admins only (was readable by anyone)
DROP POLICY IF EXISTS "Anyone can view orders" ON public.coffee_orders;

CREATE POLICY "Coffee admins can view orders"
ON public.coffee_orders
FOR SELECT
TO authenticated
USING (app_private.is_coffee_admin());

-- 2) Hash the existing plaintext admin PIN (bcrypt-compatible $2a$ hash)
UPDATE public.admin_pin_settings
SET pin = extensions.crypt(pin, extensions.gen_salt('bf'))
WHERE pin !~ '^\$2[aby]\$';

-- Document that this table is service-role only and must never expose SELECT to clients
COMMENT ON TABLE public.admin_pin_settings IS 'Admin PIN (bcrypt hashed). Service-role access only; no client SELECT/INSERT/UPDATE policies by design.';

-- 3) Reduce exposure of the SECURITY DEFINER admin-check function to anonymous callers
REVOKE EXECUTE ON FUNCTION public.is_coffee_admin() FROM anon;

-- 4) Restrict Realtime channel subscriptions to coffee admins
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Coffee admins can use realtime" ON realtime.messages;
CREATE POLICY "Coffee admins can use realtime"
ON realtime.messages
FOR SELECT
TO authenticated
USING (app_private.is_coffee_admin());