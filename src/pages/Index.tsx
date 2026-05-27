import Layout from "@/components/site/Layout";
import TileLink from "@/components/site/TileLink";
import { Link } from "react-router-dom";
import heroGlasshouse from "@/assets/hero-glasshouse-logo.png";
import heroDish from "@/assets/hero-dish.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import heroWine from "@/assets/hero-wine.jpg";
import menuBrunch from "@/assets/menu-brunch.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import vouchersHero from "@/assets/vouchers-hero.jpg";

const slides = [heroGlasshouse, heroWine];

const Index = () => {
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
            className="absolute inset-0 w-full h-full object-cover object-top carousel-slide"
            style={{ animationDelay: `${i * 10}s` }}
          />
        ))}
        
        <div className="relative z-10 h-full container-narrow flex flex-col justify-end pb-10 md:pb-14">
          <h1 className="font-serif text-cream text-3xl md:text-5xl lg:text-6xl tracked-tight uppercase fade-up">
            Creative New Zealand Dining.
          </h1>
          <div className="mt-10 flex flex-wrap gap-4 fade-up" style={{ animationDelay: "200ms" }}>
            <Link
              to="/menus"
              className="text-[11px] uppercase tracked px-7 py-4 border border-cream text-cream hover:bg-cream hover:text-charcoal transition-colors"
            >
              Menus
            </Link>
            <a
              href="tel:0062424177"
              className="text-[11px] uppercase tracked px-7 py-4 bg-brass text-charcoal hover:bg-brass/90 transition-colors"
            >
              Book
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-cream text-charcoal">
        <div className="container-narrow py-28 md:py-36 max-w-3xl text-center">
          <p className="text-[11px] uppercase tracked text-brass mb-8">​ · Whanganui</p>
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            [INTRO COPY PLACEHOLDER] A refined dining destination in the heart of Whanganui — a small room, a single team, and a quiet devotion to the produce of Aotearoa.
          </p>
        </div>
      </section>

      {/* FEATURE TILES */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <TileLink to="/menus" image={menuBrunch} label="Menus" />
            <TileLink to="/our-people" image={aboutHero} label="Our People" />
            <TileLink to="/vouchers" image={vouchersHero} label="Vouchers" />
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section className="bg-cream text-charcoal">
        <div className="container-narrow py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] uppercase tracked text-brass mb-6">Find Us</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Whanganui, New Zealand</h2>
            <div className="space-y-2 text-base">
              <p>[ADDRESS — TO ADD]</p>
              <p>Whanganui, New Zealand</p>
              <p className="pt-4"><a href="tel:0062424177" className="hover:text-brass">06 242 4177</a></p>
              <p className="text-charcoal/60">[OPENING HOURS — TO ADD]</p>
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
    </Layout>
  );
};

export default Index;
