import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) navigate("/coffee/admin", { replace: true });
  }, [session, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/coffee/admin`,
        shouldCreateUser: true,
      },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    setLoading(false);
    if (error) setError(error.message);
    else navigate("/coffee/admin", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1 text-center">Coffee Admin</h1>
        <p className="text-slate-500 text-sm text-center mb-6">Sign in with your email access code</p>

        {sent ? (
          <form onSubmit={onVerify} className="space-y-4">
            <div>
              <Label htmlFor="code">Email code</Label>
              <Input
                id="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className="mt-1 text-center tracking-[0.35em]"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={loading || code.trim().length < 6} className="w-full bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white">
              {loading ? "Checking…" : "Enter admin"}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => { setSent(false); setCode(""); setError(null); }}>
              Use a different email
            </Button>
          </form>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white"
            >
              {loading ? "Sending…" : "Send access code"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
