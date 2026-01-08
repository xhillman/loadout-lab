import ItemCard from "./ItemCard";
import items from "../_data/items.json";
import { Item } from "../_types";

const itemList: Item[] = items as Item[];

export default function ItemBrowser() {
  return (
    <div className="item-browser relative h-[calc(100vh-100px)] overflow-y-scroll p-4">
      <h2 className="text-2xl font-bold mb-4 sticky top-0 bg-neutral-950 z-10 py-2 px-4">All Items</h2>
      <div className="item-browser-grid grid grid-cols-3 gap-4">
        {itemList.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}