import Layout from "@/components/site/Layout";
import portrait from "@/assets/about-hero.jpg";

const team = [
  { name: "Matthew Tressider", role: "Executive Chef", bio: "[Short 1–2 line bio — to add.]" },
  { name: "Robbie Beint", role: "Sous Chef", bio: "[Short 1–2 line bio — to add.]" },
  { name: "Kumar Sanket", role: "Sous Chef", bio: "[Short 1–2 line bio — to add.]" },
  { name: "Naureen Shaik", role: "Sous Chef", bio: "[Short 1–2 line bio — to add.]" },
  { name: "Muhammad Rehan", role: "Sous Chef", bio: "[Short 1–2 line bio — to add.]" },
  { name: "Saroj Bhandari", role: "Sous Chef", bio: "[Short 1–2 line bio — to add.]" },
  { name: "Nicola Wright", role: "Chef", bio: "[Short 1–2 line bio — to add.]" },
];

const OurPeople = () => (
  <Layout title="Our People — Glass House Whanganui" description="Meet the chefs and team behind Glass House in Whanganui, New Zealand.">
    <section className="pt-40 pb-12 text-center container-narrow">
      <p className="text-[11px] uppercase tracked text-brass mb-6">​</p>
      <h1 className="font-serif text-5xl md:text-6xl text-cream">Our People</h1>
      <div className="w-12 h-px bg-brass mx-auto mt-8" />
    </section>

    <section className="container-narrow pb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 max-w-5xl mx-auto">
        {team.map((m) => (
          <article key={m.name} className="text-center">
            <div className="aspect-[4/5] overflow-hidden mb-6 bg-muted">
              <img src={portrait} alt={`${m.name} — ${m.role}`} loading="lazy" className="w-full h-full object-cover grayscale opacity-90" />
            </div>
            <h3 className="font-serif text-2xl text-cream">{m.name}</h3>
            <p className="text-[11px] uppercase tracked text-brass mt-2">{m.role}</p>
            <p className="text-sm text-cream/65 mt-4 leading-relaxed">{m.bio}</p>
          </article>
        ))}
      </div>
    </section>
  </Layout>
);

export default OurPeople;
