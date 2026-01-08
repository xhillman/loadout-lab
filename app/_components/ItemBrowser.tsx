import ItemCard from "./ItemCard";

export default function ItemBrowser() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Items</h2>
      <div className="item-browser-grid grid grid-cols-3 gap-4">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
}