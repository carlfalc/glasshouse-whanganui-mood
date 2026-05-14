
-- Tables
CREATE TABLE public.coffee_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  room_number text NOT NULL,
  guest_name text NOT NULL,
  phone text,
  fulfilment_type text NOT NULL,
  scheduled_for timestamptz,
  items jsonb NOT NULL,
  notes text,
  order_total numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  completed_at timestamptz,
  notify_when_ready boolean DEFAULT false,
  charged_to_room boolean DEFAULT false
);

CREATE TABLE public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  category text NOT NULL,
  base_price numeric(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0
);

CREATE TABLE public.menu_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  option_group text NOT NULL,
  name text NOT NULL,
  price_modifier numeric(10,2) NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0
);

-- RLS
ALTER TABLE public.coffee_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_options ENABLE ROW LEVEL SECURITY;

-- coffee_orders policies
CREATE POLICY "Anyone can insert orders" ON public.coffee_orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can view orders" ON public.coffee_orders FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can update orders" ON public.coffee_orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- menu_items policies
CREATE POLICY "Anyone can view menu items" ON public.menu_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can insert menu items" ON public.menu_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update menu items" ON public.menu_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete menu items" ON public.menu_items FOR DELETE TO authenticated USING (true);

-- menu_options policies
CREATE POLICY "Anyone can view menu options" ON public.menu_options FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can insert menu options" ON public.menu_options FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update menu options" ON public.menu_options FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete menu options" ON public.menu_options FOR DELETE TO authenticated USING (true);

-- Realtime
ALTER TABLE public.coffee_orders REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.coffee_orders;
