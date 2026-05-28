import { useNavigate } from "react-router-dom";
import Layout from "@/components/site/Layout";
import { Button } from "@/components/ui/button";

const OrderCoffee = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="Order Coffee — Glass House"
      description="Order coffee from Glass House, Whanganui."
    >
      <section className="bg-background pt-32 pb-24">
        <div className="container-narrow max-w-2xl text-center">
          <p className="text-[11px] uppercase tracked text-brass mb-8">Order Coffee</p>
          <h1 className="font-serif text-cream text-4xl md:text-5xl lg:text-6xl tracked-tight uppercase mb-8">
            Order Coffee
          </h1>
          <p className="text-cream/80 text-lg mb-12">
            Please select whether you are staying in-house with us, or ordering from outside.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/order-coffee/in-house")}
              className="min-w-[200px]"
            >
              Yes — I'm In House
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled
              className="min-w-[200px]"
            >
              No — Coming Soon
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OrderCoffee;
