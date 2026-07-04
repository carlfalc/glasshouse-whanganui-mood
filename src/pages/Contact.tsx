import Layout from "@/components/site/Layout";
import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (id: string, value: string) =>
    setForm((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const key = `contact-${Date.now()}`;
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          recipientEmail: "Info@glass-house.co.nz",
          idempotencyKey: `contact-notify-${key}`,
          templateData: form,
        },
      });
      if (error) throw error;

      if (form.email) {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "contact-confirmation",
            recipientEmail: form.email,
            idempotencyKey: `contact-confirm-${key}`,
            templateData: { name: form.name },
          },
        });
      }

      toast.success("Thanks for thinking of us — we'll be in contact as soon as possible.");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or call us.");
    } finally {
      setSending(false);
    }
  };


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
                <a href="mailto:Info@glass-house.co.nz" className="hover:text-brass">Info@glass-house.co.nz</a>
              </p>
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
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {submitted ? (
              <div className="border border-brass p-10 text-center">
                <p className="font-serif text-2xl text-cream">Thanks for thinking of us.</p>
                <p className="text-cream/70 text-sm mt-3">We'll be in contact as soon as possible.</p>
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
                      value={(form as Record<string, string>)[f.id]}
                      onChange={(e) => handleChange(f.id, e.target.value)}
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
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="w-full bg-transparent border-b border-border focus:border-brass outline-none py-3 text-cream resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="text-[11px] uppercase tracked px-7 py-4 bg-brass text-charcoal hover:bg-brass/90 transition-colors disabled:opacity-50"
                >
                  {sending ? "Sending…" : "Send"}
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
