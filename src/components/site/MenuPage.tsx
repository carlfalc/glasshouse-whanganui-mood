import Layout from "@/components/site/Layout";

export interface MenuSection {
  title: string;
  items: { name: string; description: string; price: string }[];
}

interface Props {
  title: string;
  descriptor: string;
  sections: MenuSection[];
  metaDescription: string;
  eyebrow?: string;
}

const MenuPage = ({ title, descriptor, sections, metaDescription, eyebrow = "[PLACEHOLDER MENU ITEMS]" }: Props) => (
  <Layout title={`${title} — Glass House Whanganui`} description={metaDescription}>
    <section className="pt-40 pb-12 text-center container-narrow">
      <p className="text-[11px] uppercase tracked text-brass mb-6">{eyebrow || "\u200b"}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-cream">{title}</h1>
      <p className="mt-6 text-cream/70 text-sm md:text-base max-w-xl mx-auto">{descriptor}</p>
      <div className="w-12 h-px bg-brass mx-auto mt-10" />
    </section>

    <section className="container-narrow pb-24">
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-16 max-w-5xl mx-auto">
        {sections.map((sec) => (
          <div key={sec.title}>
            <h2 className="text-[11px] uppercase tracked text-brass border-b border-border pb-4 mb-8">
              {sec.title}
            </h2>
            <ul className="space-y-7">
              {sec.items.map((it) => (
                <li key={it.name} className="flex gap-6 items-baseline">
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-cream">{it.name}</h3>
                    <p className="text-sm text-cream/60 mt-1 leading-relaxed">{it.description}</p>
                  </div>
                  <span className="font-serif text-lg text-brass shrink-0">{it.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-xs uppercase tracked text-cream/50 mt-24">
        Menu changes seasonally. Dietary requirements catered for on request.
      </p>
    </section>
  </Layout>
);

export default MenuPage;
