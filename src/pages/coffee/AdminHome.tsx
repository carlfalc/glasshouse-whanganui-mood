import { Link } from "react-router-dom";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ClipboardList, History, Settings } from "lucide-react";

export default function AdminHome() {
  return (
    <AdminGuard>
      <AdminShell>
        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            to="/coffee/admin/orders"
            className="group bg-white rounded-xl border border-slate-200 p-8 hover:border-[hsl(25_45%_25%)] hover:shadow-md transition"
          >
            <ClipboardList className="w-8 h-8 text-[hsl(25_45%_25%)] mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-1">Orders</h2>
            <p className="text-sm text-slate-500">View and manage incoming coffee orders</p>
          </Link>
          <Link
            to="/admindashboard"
            className="group bg-white rounded-xl border border-slate-200 p-8 hover:border-[hsl(25_45%_25%)] hover:shadow-md transition"
          >
            <History className="w-8 h-8 text-[hsl(25_45%_25%)] mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-1">Admin Dashboard</h2>
            <p className="text-sm text-slate-500">Coffee history and more</p>
          </Link>
          <Link
            to="/coffee/admin/settings"
            className="group bg-white rounded-xl border border-slate-200 p-8 hover:border-[hsl(25_45%_25%)] hover:shadow-md transition"
          >
            <Settings className="w-8 h-8 text-[hsl(25_45%_25%)] mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-1">Settings</h2>
            <p className="text-sm text-slate-500">Manage menu items, options, and cafe hours</p>
          </Link>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
