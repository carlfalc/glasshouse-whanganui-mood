CREATE TABLE public.cafe_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week integer NOT NULL UNIQUE CHECK (day_of_week BETWEEN 0 AND 6),
  open_time time,
  close_time time,
  is_closed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.cafe_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cafe settings"
  ON public.cafe_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can update cafe settings"
  ON public.cafe_settings FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can insert cafe settings"
  ON public.cafe_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

INSERT INTO public.cafe_settings (day_of_week, open_time, close_time, is_closed) VALUES
  (0, '06:30', '21:00', false),
  (1, '06:30', '21:00', false),
  (2, '06:30', '21:00', false),
  (3, '06:30', '21:00', false),
  (4, '06:30', '21:00', false),
  (5, '06:30', '21:00', false),
  (6, '06:30', '21:00', false);
