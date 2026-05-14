CREATE TABLE IF NOT EXISTS public.admin_pin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pin text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_pin_settings ENABLE ROW LEVEL SECURITY;
-- intentionally no policies: only service role (backend) may read/write

INSERT INTO public.admin_pin_settings (pin)
SELECT '1234'
WHERE NOT EXISTS (SELECT 1 FROM public.admin_pin_settings);

INSERT INTO public.coffee_admin_users (email, display_name)
VALUES ('staff@glasshouse-coffee.local', 'Coffee Staff (PIN)')
ON CONFLICT (email) DO UPDATE SET display_name = EXCLUDED.display_name;