import Layout from "@/components/site/Layout";

const OrderCoffee = () => {
  return (
    <Layout
      title="Order Coffee — Glass House"
      description="Order coffee from Glass House, Whanganui."
    >
      <section className="bg-background pt-32 pb-24">
        <div className="container-narrow max-w-3xl text-center">
          <p className="text-[11px] uppercase tracked text-brass mb-8">Order Coffee</p>
          <h1 className="font-serif text-cream text-4xl md:text-5xl lg:text-6xl tracked-tight uppercase mb-10">
            Order Coffee
          </h1>
          <p className="text-cream/80 text-lg">
            Coming soon — order your favourite Glass House coffee online.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default OrderCoffee;
