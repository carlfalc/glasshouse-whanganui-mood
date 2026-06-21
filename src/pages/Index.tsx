import { useEffect, useState } from "react";
import Layout from "@/components/site/Layout";
import TileLink from "@/components/site/TileLink";
import { useHeroTheme } from "@/components/site/HeroThemeContext";
import { Link } from "react-router-dom";
import BookingDialog from "@/components/site/BookingDialog";
import heroGlasshouse from "@/assets/hero-glasshouse-logo.png";
import heroDish from "@/assets/hero-dish.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import heroWine from "@/assets/hero-wine.jpg";
import menuBrunch from "@/assets/menu-brunch.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import culinarySpecialistsTile from "@/assets/culinary-specialists-tile.jpg";

const slides = [heroGlasshouse, heroWine];
const slideDuration = 15;

const Index = () => {
  const [active, setActive] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { setLightImageActive } = useHeroTheme();

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      slideDuration * 1000,
    );
    return () => clearInterval(id);
  }, []);

  // slides[1] (heroWine) is the lighter image — darken header text while it shows
  useEffect(() => {
    setLightImageActive(active === 1);
    return () => setLightImageActive(false);
  }, [active, setLightImageActive]);

  return (
    <Layout
      title="Glass House — Creative New Zealand Dining · Whanganui"
      description="Glass House is a modern fine-dining restaurant in Whanganui, New Zealand. Creative New Zealand dining, refined seasonal menus, an intimate room."
    >
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {slides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        
        <div className="absolute top-24 md:top-28 left-0 right-0 z-10 container-narrow fade-up">
          <p className="text-cream text-[11px] md:text-sm uppercase tracked max-w-md">
            Early bird reservations are only being taken by our booking engine — we open 3 July. Don't miss out, book now
          </p>
        </div>

        <div className="relative z-10 h-full container-narrow flex flex-col justify-end pb-10 md:pb-14">
          <h1 className="font-serif text-cream md:text-5xl lg:text-6xl tracked-tight uppercase fade-up text-lg">
            WHERE THE GARDEN COMES INSIDE&nbsp;
          </h1>
          <div className="mt-10 flex flex-wrap gap-4 fade-up" style={{ animationDelay: "200ms" }}>
            <Link
              to="/menus"
              className="text-[11px] uppercase tracked px-7 py-4 border border-cream text-cream hover:bg-cream hover:text-charcoal transition-colors"
            >
              Menus
            </Link>
            <button
              onClick={() => setBookingOpen(true)}
              className="text-[11px] uppercase tracked px-7 py-4 bg-brass text-charcoal hover:bg-brass/90 transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-cream text-charcoal">
        <div className="container-narrow py-28 md:py-36 max-w-3xl text-center">
          <p className="text-[11px] uppercase tracked text-brass mb-8">​ · Whanganui</p>
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            A refined dining destination in the heart of Whanganui — a light filled room & vibrant outside areas, a single team with and a quiet devotion to the produce of Aotearoa.
          </p>
        </div>
      </section>

      {/* FEATURE TILES */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <TileLink to="/menus" image={menuBrunch} label="Menus" />
            <TileLink to="/our-people" image={aboutHero} label="Our People" />
            <TileLink to="/culinary-specialists" image={culinarySpecialistsTile} label="Culinary Specialists" />
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section className="bg-cream text-charcoal">
        <div className="container-narrow py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] uppercase tracked text-brass mb-6">Find Us</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Whanganui</h2>
            <div className="space-y-2 text-base">
              <p className="text-[11px] uppercase tracking-wider text-brass">Address</p>
              <p>379 Victoria Avenue</p>
              <p>The Avenue Hotel</p>
              <p>Whanganui, New Zealand</p>
              <p className="pt-4"><a href="tel:062424177" className="hover:text-brass font-bold">06 242 4177</a></p>
              <div className="pt-6 space-y-1 text-charcoal/80">
                <p className="text-[11px] uppercase tracking-wider text-brass mb-2">Opening Hours</p>
                <p className="whitespace-pre-line">Soft Opening Hours&nbsp; Tues 30 June, Wed 1st July & Thursday 2nd · Dinner from 4pm&nbsp;{"\n\n"}Saturday · Open at 3pm Dinner from 4pm to Late</p>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden">
            <iframe
              title="Map of Whanganui"
              src="https://www.google.com/maps?q=Whanganui,New+Zealand&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.4) contrast(0.95)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </Layout>
  );
};

export default Index;
