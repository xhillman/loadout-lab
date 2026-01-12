
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
    <div className="item-browser relative h-[calc(100vh-110px)] overflow-y-auto p-6">
      <h2 className="text-2xl font-bold mb-6 py-2 px-2 text-text-primary tracking-wide">{currentCategory}</h2>
      <div className="item-browser-grid grid grid-cols-3 gap-5">
        {itemList.map((item) => (
          <ItemCard key={item.id} item={item} toggleItemInKit={toggleItemInKit} currentKit={currentKit} />
        ))}
      </div>
    </div>
  );
}