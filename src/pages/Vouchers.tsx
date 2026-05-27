import Layout from "@/components/site/Layout";
import { Link } from "react-router-dom";
import vouchersHero from "@/assets/vouchers-hero.jpg";

const amounts = [
  { value: "$100", desc: "A considered gesture — a course or two with wine." },
  { value: "$200", desc: "A dinner for two, thoughtfully." },
  { value: "$500", desc: "An occasion, complete." },
];

const Vouchers = () => (
  <Layout title="Gift Vouchers — Glass House Whanganui" description="Glass House gift vouchers — redeemable for any dining experience in our Whanganui restaurant.">
    <section className="relative h-[55vh] w-full overflow-hidden">
      <img src={vouchersHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      <div className="relative z-10 h-full container-narrow flex flex-col justify-end pb-16">
        <p className="text-[11px] uppercase tracked text-brass mb-4">​</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream">Gift Vouchers</h1>
      </div>
    </section>

    <section className="container-narrow py-24 max-w-3xl text-center">
      <p className="font-serif text-2xl md:text-3xl text-cream leading-snug">
        A Glass House voucher is the simplest way to give an evening that lingers.
      </p>
    </section>

    <section className="container-narrow pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {amounts.map((a) => (
          <div key={a.value} className="border border-border p-10 text-center bg-background hover:border-brass transition-colors">
            <p className="text-[11px] uppercase tracked text-brass">Voucher</p>
            <p className="font-serif text-5xl text-cream my-6">{a.value}</p>
            <p className="text-sm text-cream/65 leading-relaxed mb-8">{a.desc}</p>
            <Link
              to="/contact"
              className="inline-block text-[11px] uppercase tracked px-6 py-3 border border-cream text-cream hover:bg-brass hover:border-brass hover:text-charcoal transition-colors"
            >
              Purchase
            </Link>
          </div>
        ))}
      </div>
      <p className="text-center text-xs uppercase tracked text-cream/50 mt-16">
        Vouchers are redeemable for any Glass House dining experience. Online purchasing — coming soon.
      </p>
    </section>
  </Layout>
);

export default Vouchers;
