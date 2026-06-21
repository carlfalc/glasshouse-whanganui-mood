import Layout from "@/components/site/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "valid" | "already" | "invalid" | "done" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [state, setState] = useState<State>("loading");
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: ANON_KEY },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.valid) setState("valid");
        else if (d.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("error"));
  }, [token]);

  const confirm = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success || data?.reason === "already_unsubscribed") setState("done");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <Layout title="Unsubscribe — Glass House" description="Manage your email preferences.">
      <section className="pt-40 pb-32 text-center container-narrow min-h-[60vh]">
        <p className="text-[11px] uppercase tracked text-brass mb-6">Email preferences</p>
        {state === "loading" && <p className="text-cream/70">Checking your request…</p>}
        {state === "valid" && (
          <>
            <h1 className="font-serif text-4xl text-cream mb-8">Unsubscribe</h1>
            <p className="text-cream/70 mb-8">Click below to stop receiving emails from us.</p>
            <button
              onClick={confirm}
              className="text-[11px] uppercase tracked px-7 py-4 bg-brass text-charcoal hover:bg-brass/90 transition-colors"
            >
              Confirm Unsubscribe
            </button>
          </>
        )}
        {state === "already" && <p className="text-cream/70">You're already unsubscribed.</p>}
        {state === "done" && (
          <>
            <h1 className="font-serif text-4xl text-cream mb-4">You're unsubscribed</h1>
            <p className="text-cream/70">You won't receive further emails from us.</p>
          </>
        )}
        {state === "invalid" && <p className="text-cream/70">This unsubscribe link is invalid or expired.</p>}
        {state === "error" && <p className="text-cream/70">Something went wrong. Please try again.</p>}
      </section>
    </Layout>
  );
};

export default Unsubscribe;
