
import ItemCard from "./ItemCard";
import { Item } from "../_types";

type ItemBrowserProps = {
  selectedCategory: string | null;
  itemList: Item[];
};

export default function ItemBrowser({ selectedCategory, itemList }: ItemBrowserProps) {

  let currentCategory: string = "All Items";
  if (selectedCategory) {
    currentCategory = selectedCategory == "All" ? "All Items" : selectedCategory;
  }

  return (
    <div className="item-browser relative p-6">
      <h2 className="text-2xl font-bold mb-6 py-2 px-2 text-text-primary tracking-wide">{currentCategory}</h2>
      <div className="item-browser-grid grid grid-cols-3 gap-5">
        {itemList.map((item) => (
          <ItemCard key={item.id} item={item}/>
        ))}
      </div>
    </div>
  );
}