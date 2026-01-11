
import ItemCard from "./ItemCard";
import { Item, Kit } from "../_types";

type ItemBrowserProps = {
  selectedCategory: string | null;
  itemList: Item[];
  toggleItemInKit: (item: Item) => void;
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
};

export default function ItemBrowser({ selectedCategory, itemList, toggleItemInKit, currentKit }: ItemBrowserProps) {

  let currentCategory: string = "All Items";
  if (selectedCategory) {
    currentCategory = selectedCategory == "All" ? "All Items" : selectedCategory;
  }

  return (
    <div className="item-browser relative h-[calc(100vh-100px)] overflow-y-scroll p-4">
      <h2 className="text-xl font-bold mb-4 py-2 px-4">{currentCategory}</h2>
      <div className="item-browser-grid grid grid-cols-3 gap-4">
        {itemList.map((item) => (
          <ItemCard key={item.id} item={item} toggleItemInKit={toggleItemInKit} currentKit={currentKit} />
        ))}
      </div>
    </div>
  );
}