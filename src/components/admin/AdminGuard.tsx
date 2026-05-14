import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { loading, session, isAuthorized, email, adminError } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">Loading…</p>
      </div>
    );
  }

  if (!session) return <Navigate to="/coffee/admin/login" replace />;

  if (adminError || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">Not authorised</h1>
          <p className="text-slate-600 mb-6">
            {adminError
              ? "We couldn't confirm admin access. Please try signing out and back in."
              : <>The account <span className="font-medium">{email}</span> is not authorised to access the coffee admin.</>}
          </p>
          <Button
            onClick={() => supabase.auth.signOut()}
            className="bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
