CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'sous',
  bio TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.team_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members are viewable by everyone"
ON public.team_members
FOR SELECT
USING (true);

CREATE OR REPLACE FUNCTION public.is_coffee_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.coffee_admin_users
    WHERE lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

CREATE POLICY "Admins can insert team members"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (public.is_coffee_admin());

CREATE POLICY "Admins can update team members"
ON public.team_members
FOR UPDATE
TO authenticated
USING (public.is_coffee_admin());

CREATE POLICY "Admins can delete team members"
ON public.team_members
FOR DELETE
TO authenticated
USING (public.is_coffee_admin());

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.team_members (name, role, tier, sort_order) VALUES
  ('Matthew Tressider', 'Executive Chef', 'executive', 0),
  ('Robbie Beint', 'Sous Chef', 'sous', 0),
  ('Kumar Sanket', 'Sous Chef', 'sous', 1),
  ('Naureen Shaik', 'Sous Chef', 'sous', 2),
  ('Muhammad Rehan', 'Sous Chef', 'sous', 3),
  ('Saroj Bhandari', 'Sous Chef', 'sous', 4),
  ('Nicola Wright', 'Breakfast Chef', 'breakfast', 0);