import Layout from "@/components/site/Layout";
import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout title="Contact — Glass House Whanganui" description="Contact Glass House restaurant in Whanganui, New Zealand. Phone 06 242 4177.">
      <section className="pt-40 pb-12 text-center container-narrow">
        <p className="text-[11px] uppercase tracked text-brass mb-6">Get in touch</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream">Contact</h1>
        <div className="w-12 h-px bg-brass mx-auto mt-8" />
      </section>

      <section className="container-narrow pb-24">
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-[11px] uppercase tracked text-brass mb-4">Visit</h2>
              <p className="text-cream/80 leading-relaxed">
                379 Victoria Avenue<br />
                The Avenue Hotel<br />
                Whanganui, New Zealand
              </p>
            </div>
            <div>
              <h2 className="text-[11px] uppercase tracked text-brass mb-4">Reservations</h2>
              <p className="text-cream/80">
                <a href="tel:062424177" className="hover:text-brass">06 242 4177</a><br />
                <span className="text-cream/60">[email — to add]</span>
              </p>
            </div>
            <div>
              <h2 className="text-[11px] uppercase tracked text-brass mb-4">Hours</h2>
              <div className="text-cream/80 leading-relaxed space-y-1">
                <p>Mon – Thursday · Dinner from 4pm</p>
                <p>Friday to Saturday · Brunch & Lunch then Dinner from 10am to Late</p>
                <p>Sun · Brunch & Lunch from 10am, Dinner 5 – 8pm</p>
              </div>
            </div>
            <div>
              <h2 className="text-[11px] uppercase tracked text-brass mb-4">Follow</h2>
              <div className="flex gap-4">
                <a href="#" aria-label="Instagram" className="text-cream/80 hover:text-brass"><Instagram size={20} /></a>
                <a href="#" aria-label="Facebook" className="text-cream/80 hover:text-brass"><Facebook size={20} /></a>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-6"
          >
            {submitted ? (
              <div className="border border-brass p-10 text-center">
                <p className="font-serif text-2xl text-cream">Thank you.</p>
                <p className="text-cream/70 text-sm mt-3">We'll be in touch shortly.</p>
              </div>
            ) : (
              <>
                {[
                  { id: "name", label: "Name", type: "text" },
                  { id: "email", label: "Email", type: "email" },
                  { id: "phone", label: "Phone", type: "tel" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="text-[11px] uppercase tracked text-cream/60 block mb-2">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      required
                      className="w-full bg-transparent border-b border-border focus:border-brass outline-none py-3 text-cream"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="text-[11px] uppercase tracked text-cream/60 block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-brass outline-none py-3 text-cream resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="text-[11px] uppercase tracked px-7 py-4 bg-brass text-charcoal hover:bg-brass/90 transition-colors"
                >
                  Send
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="w-full h-[400px]">
        <iframe
          title="Map of Whanganui"
          src="https://www.google.com/maps?q=Whanganui,New+Zealand&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(0.5) contrast(0.95)" }}
          loading="lazy"
        />
      </section>
    </Layout>
  );
};

export default Contact;
