DROP POLICY IF EXISTS "Anyone can insert orders" ON public.coffee_orders;

CREATE POLICY "Anyone can submit complete coffee orders"
ON public.coffee_orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  room_number IS NOT NULL
  AND length(trim(room_number)) > 0
  AND guest_name IS NOT NULL
  AND length(trim(guest_name)) > 0
  AND fulfilment_type IS NOT NULL
  AND length(trim(fulfilment_type)) > 0
  AND items IS NOT NULL
  AND jsonb_typeof(items) = 'array'
  AND jsonb_array_length(items) > 0
  AND order_total >= 0
);