import { Fragment } from "react";
import Layout from "@/components/site/Layout";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import moninChampion from "@/assets/monin-champion.png.asset.json";

const kitchenCredentials = [
  {
    title: "Michelin Guide-linked experience",
    body: "One of our senior chefs has worked in a Michelin Guide-listed restaurant in California (USA), bringing fine-dining discipline and standards to our kitchen.",
  },
  {
    title: "Internationally acclaimed training",
    body: "A Bronze Medalist at the International Young Chef Olympiad 2023, with Michelin-linked training exposure and a refined French cuisine background developed across France and New Zealand.",
  },
  {
    title: "Premium global hotel pedigree",
    body: "Experience across world-renowned establishments including Marina Bay Sands (Singapore), Burj Al Arab, Hilton Dubai Palm Jumeirah and Jumeirah (Dubai), Rotana, Accor and Marriott hotel groups.",
  },
  {
    title: "Red Seal certified leadership",
    body: "A Canadian Red Seal-certified chef (Vancouver), with Executive Chef and Head Chef experience across steakhouses, golf clubs and lodge dining, now settled locally in Whanganui.",
  },
  {
    title: "Degree-qualified culinary leadership",
    body: "A chef holding a BA in Hospitality Management from Edinburgh Napier University (Scotland, UK), with senior roles across leading New Zealand hospitality groups and US kitchens.",
  },
  {
    title: "New Zealand-qualified hotel specialists",
    body: "Chefs holding NZQF Level 5 Diplomas in Culinary Art, with deep experience in hotel breakfast, conferencing, banqueting and all-day dining.",
  },
  {
    title: "Broad cuisine range",
    body: "Collective expertise across Continental, French, Indian, Korean, Japanese, Italian, Mexican and modern New Zealand cuisine.",
  },
];

const fohCredentials = [
  {
    title: "New Zealand National Mixology Champion",
    body: "Congratulations to Sandesh Thapa, the reigning MONIN Cup New Zealand 2026 Champion, crowned national champion under the “Timeless Twists” theme. He will represent New Zealand on the global stage at the World Championships in September 2026, and will anchor our bar and beverage programme from day one.",
  },
  {
    title: "Experienced restaurant & bar management",
    body: "Our Complex Manager holds a Master’s in Hospitality Management, along with a current Manager’s Certificate and Licence Controller Qualification (LCQ), with general management experience in a comparable venue.",
  },
  {
    title: "Specialist barista & coffee programme",
    body: "A dedicated barista and coffee specialist to lead our barista and self-serve coffee offering across the buffet and bar.",
  },
  {
    title: "Competition-level barista expertise",
    body: "A barista who has trained and judged baristas at competitive level; a genuine coffee geek who loves crafting specialty coffee, ensuring our coffee programme is exceptional from day one. We have also partnered with Grinders Coffee — Australia’s number one coffee and bean company — for a premium café coffee experience.",
  },
];

const footprint = [
  "Marina Bay Sands — Singapore",
  "Burj Al Arab — Dubai, UAE",
  "Jumeirah Group — Dubai, UAE",
  "Hilton Dubai Palm Jumeirah — Dubai, UAE",
  "Hilton — Malta",
  "SAMAYA Hotels & Resorts — Dubai, UAE",
  "Rotana Hotels — UAE",
  "Accor Hotels — International",
  "National Hotel (Marriott) — Moscow, Russia",
  "Garden Restaurant — Moscow, Russia",
  "Hotel Acquamarine — Moscow, Russia",
  "Michelin Guide-listed restaurant — California, USA",
  "ROOH — San Francisco & Palo Alto, USA",
  "Tulsi — Los Angeles, California, USA",
  "Zaika — Seattle, USA",
  "Gaylord Opryland Resort — Nashville, USA",
  "Vancouver Community College (Red Seal) — Canada",
  "Sun Peaks Lodge Steakhouse — Canada",
  "Meadow Gardens Golf Club — Vancouver, Canada",
  "Northview Golf & Country Club — Canada",
  "Capones Italian Kitchen — Canada",
  "Edinburgh Napier University — Scotland, UK",
  "Bowood Hotel, Spa & Golf — UK",
  "Hotel La Mère Champlain — Cancale, France",
  "Hotel Restaurant & Spa Julien — Fouday, Strasbourg, France",
  "Hotel A l’Ami Fritz — Ottrott, France",
  "Hotel Le Domaine de Baulieu — Auch, France",
  "The Terrace Hotel (Head Chef) — Perth, Australia",
  "The Iluka — Perth, Australia",
  "Herb Faust Food / Houghton Winery — Perth, Australia",
  "Crown Casino — Perth, Australia",
  "Bouchon Bistro — Perth, Australia",
  "Retro Café (Fitzroy) — Melbourne, Australia",
  "Ganga Ratna Restaurant — Tokyo, Japan",
  "Namaste Restaurant — Sumiyoshi, Fukuoka, Japan",
  "Hotel Vaishali — Kathmandu, Nepal",
  "Airport lounges & fine dining — Kolkata, India",
  "Young Chef Olympiad — International",
  "Star Group / Kapura Hospitality — Wellington, NZ",
  "Heritage Hanmer Springs — Canterbury, NZ",
  "Suncourt Hotel — Taupō, NZ",
  "Brentwood Hotel — Wellington, NZ",
  "Peppers Bluewater Resort — Lake Tekapo, NZ",
  "Compass Group — New Zealand",
  "Himalayan Fusion — Auckland, NZ",
];

const Credential = ({ title, body }: { title: string; body: string }) => (
  <li className="flex gap-4">
    <span className="text-brass shrink-0 mt-1" aria-hidden>
      ✓
    </span>
    <div>
      <h3 className="font-serif text-lg text-cream">{title}</h3>
      <p className="text-sm text-cream/65 mt-1 leading-relaxed">{body}</p>
    </div>
  </li>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[11px] uppercase tracked text-brass border-b border-border pb-4 mb-8">
    {children}
  </h2>
);

const CulinarySpecialists = () => (
  <Layout
    title="Culinary Specialists — Glass House Whanganui"
    description="Meet the internationally trained chefs, award-winning bar talent and certified leaders behind Glass House at The Avenue Hotel, Whanganui."
  >
    <section className="pt-40 pb-12 text-center container-narrow">
      <p className="text-[11px] uppercase tracked text-brass mb-6">The Avenue Hotel • Whanganui</p>
      <h1 className="font-serif text-5xl md:text-6xl text-cream">Culinary Specialists</h1>
      <div className="w-12 h-px bg-brass mx-auto mt-8" />
    </section>

    <section className="container-narrow pb-24 max-w-3xl mx-auto space-y-6">
      <p className="font-serif text-2xl text-cream">Kia ora,</p>
      <p className="text-cream/75 leading-relaxed">
        Our recruitment attracted exceptional talent — and we’ve handpicked the best for the
        Glasshouse. Great teams are built on humility, passion and genuine care for guests, shaped by
        people who’ve lived, travelled and experienced the world.
      </p>
      <p className="text-cream/75 leading-relaxed">
        Their journey begins here on 27 June, opening with an already curated menu. As we head into
        our first summer, we’ll evolve the menus together, drawing on the talents of the whole team.
        Every few weeks, one of our chefs takes the spotlight to create their own signature main —
        find it on our menu as the ‘Seasonal Special’.
      </p>
    </section>

    <section className="container-narrow pb-20 max-w-3xl mx-auto">
      <SectionHeading>Kitchen Team — Calibre &amp; Credentials</SectionHeading>
      <ul className="space-y-8">
        {kitchenCredentials.map((c) => (
          <Credential key={c.title} {...c} />
        ))}
      </ul>
    </section>

    <section className="container-narrow pb-20 max-w-3xl mx-auto">
      <SectionHeading>Featured — Our French-Trained Sous Chef</SectionHeading>
      <p className="text-cream/75 leading-relaxed">
        Naureen, one of our incoming Sous Chefs, has had her culinary journey featured in{" "}
        <span className="text-cream">The Telegraph India</span>, recognised as a young chef shining
        on the international stage at the Young Chef Olympiad. Her story is well worth a read.
      </p>
      <a
        href="https://www.telegraphindia.com/my-kolkata/news/twenty-year-old-chef-from-kolkata-shines-in-international-young-chef-olympiad/cid/1915045"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-[11px] uppercase tracked text-brass border-b border-brass pb-1 hover:text-cream transition-colors"
      >
        Read her story
      </a>
    </section>

    <section className="container-narrow pb-20 max-w-3xl mx-auto">
      <SectionHeading>Front of House &amp; Bar — Award-Winning Talent</SectionHeading>
      <ul className="space-y-8">
        {fohCredentials.map((c, i) => (
          <Fragment key={c.title}>
            <Credential {...c} />
            {i === 0 && (
              <li className="ml-8 -mt-4 list-none">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="inline-block text-[11px] uppercase tracked text-brass border-b border-brass pb-1 hover:text-cream transition-colors">
                      View the announcement
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl p-0 overflow-hidden bg-transparent border-0">
                    <img
                      src={moninChampion.url}
                      alt="Sandesh Thapa named MONIN Cup 2026 New Zealand Champion"
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </section>

    <section className="container-narrow pb-20 max-w-3xl mx-auto">
      <SectionHeading>Where They’ve Been — A Global Footprint</SectionHeading>
      <p className="text-cream/75 leading-relaxed mb-8">
        Between them, our incoming team has trained, cooked and led in kitchens, hotels and bars
        across the globe. A snapshot of the establishments and destinations on their collective CVs:
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
        {footprint.map((place) => (
          <li key={place} className="text-sm text-cream/65 border-b border-border/50 pb-2">
            {place}
          </li>
        ))}
      </ul>
    </section>

    <section className="container-narrow pb-32 max-w-3xl mx-auto">
      <SectionHeading>Why This Matters</SectionHeading>
      <div className="space-y-6">
        <p className="text-cream/75 leading-relaxed">
          A new restaurant lives or dies on the strength of its team — and its prices! The calibre of
          people choosing to join us — internationally trained chefs, award-winning mixology talent,
          and qualified, certified leaders — is a strong signal of the standard we intend to set. We
          genuinely believe this team can help make the Glasshouse the number one dining and bar
          destination in Whanganui.
        </p>
        <p className="text-cream/75 leading-relaxed">
          Once we hit daylight savings 2026, we’ll be open all day, Tuesday to Sunday — moving into
          summer with an open door to our Whanganui community.
        </p>
        <p className="font-serif text-xl text-cream">Ngā mihi nui</p>
        <p className="font-serif text-xl text-cream">Carl &amp; Freya</p>
      </div>
    </section>
  </Layout>
);

export default CulinarySpecialists;
