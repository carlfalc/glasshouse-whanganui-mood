import { useState } from "react";
import Layout from "@/components/site/Layout";
import TileLink from "@/components/site/TileLink";
import DinnerMenuDialog from "@/components/site/DinnerMenuDialog";
import menuBrunch from "@/assets/menu-brunch.jpg";
import menuDinner from "@/assets/menu-dinner.jpg";
import menuRoom from "@/assets/menu-room-service.jpg";

const Menus = () => {
  const [dinnerOpen, setDinnerOpen] = useState(false);

  return (
    <Layout title="Menus — Glass House Whanganui" description="Brunch & Lunch, Dinner, and Room Service menus at Glass House, Whanganui.">
      <section className="pt-40 pb-16 text-center container-narrow">
        <p className="text-[11px] uppercase tracked text-brass mb-6">​</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream">Menus</h1>
        <div className="w-12 h-px bg-brass mx-auto mt-8" />
      </section>
      <section className="container-narrow pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <TileLink to="/menus/brunch-lunch" image={menuBrunch} label="Brunch & Lunch" />
          <button onClick={() => setDinnerOpen(true)} className="block text-left">
            <TileLink to="/menus" image={menuDinner} label="Dinner" onClick={(e) => { e.preventDefault(); setDinnerOpen(true); }} />
          </button>
          <TileLink to="/menus/room-service" image={menuRoom} label="Room Service" />
        </div>
      </section>
      <DinnerMenuDialog open={dinnerOpen} onOpenChange={setDinnerOpen} />
    </Layout>
  );
};

export default Menus;
