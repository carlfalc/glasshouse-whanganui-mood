import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export const ADMIN_EMAIL = "falconercarlandrew@gmail.com";

export type CoffeeAdminUser = {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
};

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminUser, setAdminUser] = useState<CoffeeAdminUser | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!mounted) return;
      setSession(s);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const email = useMemo(() => session?.user?.email?.trim().toLowerCase() ?? null, [session]);

  useEffect(() => {
    let cancelled = false;

    if (loading) return;

    if (!email) {
      setAdminUser(null);
      setAdminError(null);
      setAdminLoading(false);
      return;
    }

    setAdminLoading(true);
    setAdminError(null);

    // Shared staff PIN account is always authorised
    if (email === "staff@glasshouse-coffee.local") {
      setAdminUser({
        id: "shared",
        email,
        display_name: "Staff",
        created_at: "",
        updated_at: "",
      });
      setAdminLoading(false);
      return;
    }

    (supabase as any)
      .from("coffee_admin_users")
      .select("id,email,display_name,created_at,updated_at")
      .ilike("email", email)
      .maybeSingle()
      .then(({ data, error }: { data: CoffeeAdminUser | null; error: { message: string } | null }) => {
        if (cancelled) return;
        if (error) {
          setAdminUser(null);
          setAdminError(error.message);
        } else {
          setAdminUser(data);
        }
        setAdminLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [email, loading]);

  const isAuthorized = !!adminUser;

  return {
    session,
    loading: loading || adminLoading,
    authLoading: loading,
    adminLoading,
    email,
    adminUser,
    adminError,
    isAuthorized,
  };
}
