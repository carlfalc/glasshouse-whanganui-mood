import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) navigate("/coffee/admin", { replace: true });
  }, [session, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = pin.trim();
    if (!/^\d{4,12}$/.test(trimmed)) {
      setError("Enter the 4–12 digit staff PIN.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: invokeErr } = await supabase.functions.invoke("admin-pin-login", {
        body: { pin: trimmed },
      });

      if (invokeErr) {
        const message =
          (invokeErr as { context?: { error?: string } }).context?.error ??
          invokeErr.message ??
          "Sign-in failed";
        setError(message);
        return;
      }

      const { email, token } = (data ?? {}) as { email?: string; token?: string };
      if (!email || !token) {
        setError("Sign-in failed. Try again.");
        return;
      }

      const { error: verifyErr } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });
      if (verifyErr) {
        setError(verifyErr.message);
        return;
      }

      navigate("/coffee/admin", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1 text-center">Coffee Admin</h1>
        <p className="text-slate-500 text-sm text-center mb-6">Enter the staff PIN to continue</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="pin">Staff PIN</Label>
            <Input
              id="pin"
              type="password"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="••••"
              className="mt-1 text-center tracking-[0.5em] text-lg"
              maxLength={12}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            disabled={loading || pin.length < 4}
            className="w-full bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white"
          >
            {loading ? "Signing in…" : "Enter admin"}
          </Button>
        </form>
      </div>
    </div>
  );
}
