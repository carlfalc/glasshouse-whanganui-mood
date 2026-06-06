import Layout from "@/components/site/Layout";
import portrait from "@/assets/about-hero.jpg";

type Member = {
  name: string;
  role: string;
  bio: string;
};

const executiveChef: Member = {
  name: "Matthew Tressider",
  role: "Executive Chef",
  bio: "Bio coming soon.",
};

const sousChefs: Member[] = [
  { name: "Robbie Beint", role: "Sous Chef", bio: "Bio coming soon." },
  { name: "Kumar Sanket", role: "Sous Chef", bio: "Bio coming soon." },
  { name: "Naureen Shaik", role: "Sous Chef", bio: "Bio coming soon." },
  { name: "Muhammad Rehan", role: "Sous Chef", bio: "Bio coming soon." },
  { name: "Saroj Bhandari", role: "Sous Chef", bio: "Bio coming soon." },
];

const breakfastChef: Member = {
  name: "Nicola Wright",
  role: "Breakfast Chef",
  bio: "Bio coming soon.",
};

const Card = ({ name, role, bio }: Member) => (
  <div className="text-center">
    <div className="aspect-[3/4] overflow-hidden rounded-sm">
      <img
        src={portrait}
        alt={name}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
    <h3 className="font-serif text-xl text-cream mt-4">{name}</h3>
    <p className="text-[11px] uppercase tracked text-brass mt-1">{role}</p>
    <p className="text-sm text-cream/65 mt-3 leading-relaxed">{bio}</p>
  </div>
);

const OurPeople = () => (
  <Layout
    title="Our People — Glass House Whanganui"
    description="Meet the team behind Glass House at The Avenue Hotel, Whanganui — our Executive Chef, Sous Chefs and Breakfast Chef."
  >
    <section className="pt-40 pb-12 text-center container-narrow">
      <p className="text-[11px] uppercase tracked text-brass mb-6">The Avenue Hotel • Whanganui</p>
      <h1 className="font-serif text-5xl md:text-6xl text-cream">Our People</h1>
      <div className="w-12 h-px bg-brass mx-auto mt-8" />
    </section>

    <section className="container-narrow pb-32 max-w-5xl mx-auto space-y-16">
      {/* Executive Chef */}
      <div className="max-w-xs mx-auto">
        <Card {...executiveChef} />
      </div>

      {/* Sous Chefs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {sousChefs.map((m) => (
          <Card key={m.name} {...m} />
        ))}
      </div>

      {/* Breakfast Chef */}
      <div className="max-w-xs mx-auto">
        <Card {...breakfastChef} />
      </div>
    </section>
  </Layout>
);

export default OurPeople;
