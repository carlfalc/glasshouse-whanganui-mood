import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Menus from "./pages/Menus.tsx";
import BrunchLunch from "./pages/BrunchLunch.tsx";
import Dinner from "./pages/Dinner.tsx";
import RoomService from "./pages/RoomService.tsx";
import About from "./pages/About.tsx";
import OurPeople from "./pages/OurPeople.tsx";
import Vouchers from "./pages/Vouchers.tsx";
import OrderCoffee from "./pages/OrderCoffee.tsx";
import InHouseCoffee from "./pages/InHouseCoffee.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/coffee/AdminLogin.tsx";
import AdminHome from "./pages/coffee/AdminHome.tsx";
import AdminOrders from "./pages/coffee/AdminOrders.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminSettings from "./pages/coffee/AdminSettings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/menus/brunch-lunch" element={<BrunchLunch />} />
          <Route path="/menus/dinner" element={<Dinner />} />
          <Route path="/menus/room-service" element={<RoomService />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-people" element={<OurPeople />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/order-coffee" element={<OrderCoffee />} />
          <Route path="/order-coffee/in-house" element={<InHouseCoffee />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coffee/admin/login" element={<AdminLogin />} />
          <Route path="/coffee/admin" element={<AdminHome />} />
          <Route path="/coffee/admin/orders" element={<AdminOrders />} />
          <Route path="/coffee/admin/history" element={<AdminDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/coffee/admin/settings" element={<AdminSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
