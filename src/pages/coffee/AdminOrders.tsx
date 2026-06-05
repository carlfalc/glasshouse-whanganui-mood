import { useEffect, useState, useCallback } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { Link } from "react-router-dom";
import { ChevronLeft, RefreshCw } from "lucide-react";
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

const STATUS_FLOW: Record<string, { label: string; next: string | null; badge: string }> = {
  pending: { label: "New", next: "in_progress", badge: "bg-amber-100 text-amber-800" },
  in_progress: { label: "In Progress", next: "completed", badge: "bg-blue-100 text-blue-800" },
  completed: { label: "Done", next: null, badge: "bg-green-100 text-green-800" },
};

function OrdersContent() {
  const [orders, setOrders] = useState<CoffeeOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("coffee_orders")
      .select("*")
      .neq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      toast({ title: "Could not load orders", description: error.message, variant: "destructive" });
    } else {
      setOrders((data ?? []) as CoffeeOrder[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel("coffee_orders_admin")
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

  const advance = async (order: CoffeeOrder) => {
    const next = STATUS_FLOW[order.status]?.next;
    if (!next) return;
    const { error } = await supabase
      .from("coffee_orders")
      .update({
        status: next,
        completed_at: next === "completed" ? new Date().toISOString() : null,
      })
      .eq("id", order.id);
    if (error) {
      toast({ title: "Could not update order", description: error.message, variant: "destructive" });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Link to="/coffee/admin" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      <h1 className="text-2xl font-semibold text-slate-900 mb-1">Orders</h1>
      <p className="text-sm text-slate-500 mb-6">New orders appear here automatically.</p>

      {orders.length === 0 && !loading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const flow = STATUS_FLOW[order.status] ?? STATUS_FLOW.pending;
            return (
              <div
                key={order.id}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-slate-900">Room/Unit {order.room_number}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-700">{order.guest_name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${flow.badge}`}>
                      {flow.label}
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
                    {" · "}
                    {new Date(order.created_at).toLocaleString()}
                  </div>
                </div>
                {flow.next && (
                  <Button
                    onClick={() => advance(order)}
                    className="bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white whitespace-nowrap"
                  >
                    {order.status === "pending" ? "Start" : "Mark Done"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function AdminOrders() {
  return (
    <AdminGuard>
      <AdminShell>
        <OrdersContent />
      </AdminShell>
    </AdminGuard>
  );
}
