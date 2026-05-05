import MenuPage from "@/components/site/MenuPage";

const placeholder = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    name: `[Dish Name ${i + 1}]`,
    description: "[Short one-line dish description — to be added.]",
    price: "$00",
  }));

const RoomService = () => (
  <MenuPage
    title="Room Service"
    descriptor="A considered in-room menu, available throughout the evening."
    metaDescription="Glass House Room Service menu — in-room dining in Whanganui."
    sections={[
      { title: "All Day", items: placeholder(6) },
      { title: "Sweet & Cheese", items: placeholder(4) },
    ]}
  />
);

export default RoomService;
