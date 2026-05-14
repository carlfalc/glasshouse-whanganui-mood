import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function AdminOrders() {
  return (
    <AdminGuard>
      <AdminShell>
        <Link to="/coffee/admin" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-4">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">Orders</h1>
          <p className="text-slate-500">Coming soon</p>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
