import { useState } from "react";
import Layout from "@/components/site/Layout";
import TileLink from "@/components/site/TileLink";
import DinnerMenuDialog from "@/components/site/DinnerMenuDialog";
import RoomServiceMenuDialog from "@/components/site/RoomServiceMenuDialog";
import BrunchLunchMenuDialog from "@/components/site/BrunchLunchMenuDialog";
import BeverageMenuDialog from "@/components/site/BeverageMenuDialog";
import menuBrunch from "@/assets/menu-brunch.jpg";
import menuDinner from "@/assets/menu-dinner.jpg";
import menuRoom from "@/assets/menu-room-service.jpg";
import menuBeverages from "@/assets/menu-beverages.jpg";

const Menus = () => {
  const [dinnerOpen, setDinnerOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [brunchOpen, setBrunchOpen] = useState(false);
  const [beverageOpen, setBeverageOpen] = useState(false);

  return (
    <Layout title="Menus — Glass House Whanganui" description="Brunch & Lunch, Dinner, and Room Service menus at Glass House, Whanganui.">
      <section className="pt-40 pb-16 text-center container-narrow">
        <p className="text-[11px] uppercase tracked text-brass mb-6">​</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream">Menus</h1>
        <div className="w-12 h-px bg-brass mx-auto mt-8" />
      </section>
      <section className="container-narrow pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <TileLink to="/menus" image={menuBrunch} label={"Brunch & Lunch\u00a0\nComing Soon!"} onClick={(e) => { e.preventDefault(); setBrunchOpen(true); }} />
          <TileLink to="/menus" image={menuDinner} label="Dinner" onClick={(e) => { e.preventDefault(); setDinnerOpen(true); }} />

          <TileLink to="/menus" image={menuRoom} label="Room Service" cornerText="Hotels King Room" onClick={(e) => { e.preventDefault(); setRoomOpen(true); }} />
          <TileLink to="/menus" image={menuBeverages} label="Beverages" onClick={(e) => { e.preventDefault(); setBeverageOpen(true); }} />
        </div>
      </section>
      <section className="container-narrow pb-32 text-center">
        <p className="font-serif italic text-lg md:text-xl text-cream/80 leading-relaxed">
          Have a special event, function or birthday? Please email us at{" "}
          <a href="mailto:info@glass-house.co.nz" className="text-brass hover:underline">
            info@glass-house.co.nz
          </a>{" "}
          to see if we can help.
        </p>
      </section>
      <DinnerMenuDialog open={dinnerOpen} onOpenChange={setDinnerOpen} />
      <RoomServiceMenuDialog open={roomOpen} onOpenChange={setRoomOpen} />
      <BrunchLunchMenuDialog open={brunchOpen} onOpenChange={setBrunchOpen} />
      <BeverageMenuDialog open={beverageOpen} onOpenChange={setBeverageOpen} />
    </Layout>
  );
};

export default Menus;
