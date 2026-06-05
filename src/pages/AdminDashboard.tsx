import { useEffect, useState, useCallback } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type OrderItem = {
  coffee?: string;
  decaf?: boolean;
  sugar?: number;
  milk?: string;
  cup?: string;
};

type CoffeeOrder = {
  id: string;
  created_at: string;
  room_number: string;
  guest_name: string;
  fulfilment_type: string;
  items: OrderItem[];
  notes: string | null;
  status: string;
  charged_to_room: boolean | null;
  completed_at: string | null;
};

function DashboardContent() {
  const [orders, setOrders] = useState<CoffeeOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("coffee_orders")
      .select("*")
      .eq("status", "completed")
      .order("completed_at", { ascending: false })
      .limit(500);
    if (error) {
      toast({ title: "Could not load history", description: error.message, variant: "destructive" });
    } else {
      setOrders((data ?? []) as CoffeeOrder[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel("admin_dashboard_history")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "coffee_orders" },
        () => load(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>
      <p className="text-sm text-slate-500 mb-8">More sections will be added here over time.</p>

      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Coffee History</h2>
        <p className="text-sm text-slate-500 mb-4">Completed coffee orders appear here automatically.</p>

        {orders.length === 0 && !loading ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
            No completed orders yet.
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-slate-200 rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-slate-900">Room/Unit {order.room_number}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-700">{order.guest_name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-800">
                    Done
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  {order.items?.map((it, i) => (
                    <span key={i}>
                      {it.decaf ? "Decaf " : ""}
                      {it.coffee} — {it.cup}, {it.milk}, sugar {it.sugar}
                      {i < order.items.length - 1 ? "; " : ""}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {order.fulfilment_type === "room_delivery" ? "Room/Unit delivery" : "Counter pickup"}
                  {order.charged_to_room ? " · Charged to room" : ""}
                  {" · Ordered "}
                  {new Date(order.created_at).toLocaleString()}
                  {order.completed_at ? ` · Completed ${new Date(order.completed_at).toLocaleString()}` : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminShell>
        <DashboardContent />
      </AdminShell>
    </AdminGuard>
  );
}
