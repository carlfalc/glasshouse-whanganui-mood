import Layout from "@/components/site/Layout";
import aboutHero from "@/assets/about-hero.jpg";


const About = () => (
  <Layout title="About — Glass House Whanganui" description="The story of Glass House, a restaurant in Whanganui, New Zealand.">
    <section className="relative h-[60vh] w-full overflow-hidden mt-0">
      <img src={aboutHero} alt="Chef plating at Glass House" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      <div className="relative z-10 h-full container-narrow flex flex-col justify-end pb-16">
        <p className="text-[11px] uppercase tracked text-brass mb-4">About</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream">Our Story</h1>
      </div>
    </section>

    <section className="bg-background py-24 md:py-32">
      <div className="container-narrow grid md:grid-cols-2 gap-16 max-w-5xl">
        <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight">
          A small room with a quiet ambition.
        </h2>
        <div className="text-cream/75 leading-relaxed space-y-5 text-base">
          <p>
            Glasshouse began as a simple idea: a refined dining room in the centre of Whanganui, with an airy light filled room that connects to dining and drinks outdoors. Our Glasshouse is dedicated to the produce around the river, the coast, and the country around it.
          </p>
          <p>
            The team is intentionally close. Our menu's shift with the seasons, like the travellers who explore our city, that come and go.
          </p>
          <p>
            We have brought together some of NZ & the worlds talented chefs, a youth olympic bronze medalist, NZ's 2026 Monin Mixologist Champion and a 'coffee nerd'. This is not fine dining, <em className="italic">'its a small place with a quiet ambition'</em> that we can all share no matter who we are.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-cream text-charcoal py-28 md:py-36">
      <div className="container-narrow max-w-3xl text-center">
        <p className="font-serif italic text-3xl md:text-4xl leading-snug">
          "Meals make the society, hold the fabric together in lots of ways that were charming and interesting and intoxicating to me."
        </p>
        <p className="mt-8 text-[11px] uppercase tracked text-brass">— Anthony Bourdain</p>
      </div>
    </section>
  </Layout>
);

export default About;
