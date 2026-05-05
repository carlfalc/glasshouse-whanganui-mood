import MenuPage from "@/components/site/MenuPage";

const placeholder = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    name: `[Dish Name ${i + 1}]`,
    description: "[Short one-line dish description — to be added.]",
    price: "$00",
  }));

const Dinner = () => (
  <MenuPage
    title="Dinner"
    descriptor="An evening tasting of New Zealand's finest produce, served à la carte."
    metaDescription="Glass House Dinner menu — fine-dining evening service in Whanganui, New Zealand."
    sections={[
      { title: "Entrées", items: placeholder(5) },
      { title: "Mains", items: placeholder(5) },
      { title: "Sides", items: placeholder(4) },
      { title: "Desserts", items: placeholder(4) },
    ]}
  />
);

export default Dinner;
