import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AdminUser = {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
};

export function AdminUsersTab() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("coffee_admin_users")
      .select("id,email,display_name,created_at")
      .order("email");
    if (error) toast.error(error.message);
    else setUsers((data ?? []) as AdminUser[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addUser = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;

    setSaving(true);
    const { data, error } = await (supabase as any)
      .from("coffee_admin_users")
      .insert({ email: normalized, display_name: displayName.trim() || null })
      .select("id,email,display_name,created_at")
      .single();
    setSaving(false);

    if (error) return toast.error(error.message);
    setUsers((prev) => [...prev, data as AdminUser].sort((a, b) => a.email.localeCompare(b.email)));
    setEmail("");
    setDisplayName("");
    toast.success("Admin user added");
  };

  const removeUser = async (user: AdminUser) => {
    const { error } = await (supabase as any).from("coffee_admin_users").delete().eq("id", user.id);
    if (error) return toast.error(error.message);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    toast.success("Admin user removed");
  };

  if (loading) return <p className="text-slate-500 text-sm">Loading…</p>;

  return (
    <div className="space-y-6">
      <form onSubmit={addUser} className="bg-white rounded-xl border border-slate-200 p-6 grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
        <div>
          <Label htmlFor="admin-email">Email address</Label>
          <Input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="manager@example.com" className="mt-1" required />
        </div>
        <div>
          <Label htmlFor="admin-name">Name</Label>
          <Input id="admin-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Optional" className="mt-1" />
        </div>
        <Button type="submit" disabled={saving} className="bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white">
          <Plus className="w-4 h-4" /> Add User
        </Button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">Admin access</div>
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div key={user.id} className="px-6 py-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-slate-900">{user.email}</p>
                {user.display_name && <p className="text-sm text-slate-500">{user.display_name}</p>}
              </div>
              <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(user)} aria-label={`Remove ${user.email}`}>
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove admin access?</AlertDialogTitle>
            <AlertDialogDescription>{deleteTarget?.email} will no longer be able to manage coffee settings.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteTarget) removeUser(deleteTarget); setDeleteTarget(null); }} className="bg-red-600 hover:bg-red-700">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}