import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MenuItemsTab } from "@/components/admin/settings/MenuItemsTab";
import { OptionsTab } from "@/components/admin/settings/OptionsTab";
import { CafeHoursTab } from "@/components/admin/settings/CafeHoursTab";

export default function AdminSettings() {
  const [tab, setTab] = useState("items");
  return (
    <AdminGuard>
      <AdminShell>
        <Link to="/coffee/admin" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-4">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Settings</h1>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="options">Options &amp; Modifiers</TabsTrigger>
            <TabsTrigger value="hours">Cafe Hours</TabsTrigger>
          </TabsList>
          <TabsContent value="items"><MenuItemsTab /></TabsContent>
          <TabsContent value="options"><OptionsTab /></TabsContent>
          <TabsContent value="hours"><CafeHoursTab /></TabsContent>
        </Tabs>
      </AdminShell>
    </AdminGuard>
  );
}
