import { Item, Kit } from "../_types";

type ItemCardProps = {
  item: Item;
  toggleItemInKit: (item: Item) => void;
  currentKit: Omit<Kit, "id" | "created_at" | "updated_at">;
};

export default function ItemCard({
  item,
  toggleItemInKit,
  currentKit,
}: ItemCardProps) {
  const isItemInKit = currentKit.items.some(
    (kitItem) => kitItem.id === item.id
  );

  return (
    <div className={`item-card p-2 border ${isItemInKit ? "border-amber-200/30 inset-shadow-sm inset-shadow-amber-400/20" : "border-neutral-100/10 hover:border-amber-200/20"} shadow-lg/50 rounded flex flex-col justify-between min-h-[180px] hover:scale-103 transition-all duration-200`}>
      <div>
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="text-sm text-blue-100/90 bg-blue-500/30 border border-blue-500/20 w-fit rounded px-2 py-1">
          {item.weight_oz} oz
        </p>
      </div>
      <div className="item-card-footer flex justify-between items-end">
        <p className="text-lg font-bold">${item.price_usd}</p>
        <button
          className={`border ${
            isItemInKit ? " border-red-500/20 bg-red-500/10 hover:border-red-500/30 hover:bg-red-500/20" : " bg-green-600/10  border-green-600/20 hover:border-green-600/30 hover:bg-green-600/20"
          }   text-lg font-bold px-4 py-2 rounded cursor-pointer shadow-md/30 transition-all duration-200`}
          onClick={() => toggleItemInKit(item)}
        >
          {isItemInKit ? "Remove" : "+ Add"}
        </button>
      </div>
    </div>
  );
}
