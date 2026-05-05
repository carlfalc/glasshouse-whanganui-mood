import MenuPage from "@/components/site/MenuPage";

const placeholder = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    name: `[Dish Name ${i + 1}]`,
    description: "[Short one-line dish description — to be added.]",
    price: "$00",
  }));

const BrunchLunch = () => (
  <MenuPage
    title="Brunch & Lunch"
    descriptor="A relaxed daytime menu of seasonal small and large plates."
    metaDescription="Glass House Brunch & Lunch menu — seasonal daytime plates in Whanganui."
    sections={[
      { title: "To Begin", items: placeholder(4) },
      { title: "Plates", items: placeholder(6) },
      { title: "Sweet", items: placeholder(4) },
    ]}
  />
);

export default BrunchLunch;
