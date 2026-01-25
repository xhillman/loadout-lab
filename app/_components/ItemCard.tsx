import { Item } from "../_types";
import { useKitStore } from "../_stores/useKitStore";

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({
  item,
}: ItemCardProps) {
  const { kit, toggleItem } = useKitStore();

  const isItemInKit = kit.items.some((kitItem) => kitItem.id === item.id);

  return (
    <div className={`item-card p-4 rounded-lg flex flex-col justify-between min-h-[180px] transition-all duration-200 ease-smooth ${
      isItemInKit 
        ? "card-active" 
        : "card-interactive hover:scale-[1.02]"
    }`}>
      <div>
        <h3 className="text-lg font-bold text-text-primary mb-2">{item.name}</h3>
        <p className="text-xs text-accent-green bg-accent-green/10 border border-accent-green/20 w-fit rounded-full px-3 py-1 font-medium">
          {item.weight_oz} oz
        </p>
      </div>
      <div className="item-card-footer flex justify-between items-end mt-4">
        <p className="text-xl font-bold text-text-primary">${item.price_usd}</p>
        <button
          className={`text-sm font-bold px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ease-smooth ${
            isItemInKit 
              ? "bg-accent-red/15 border border-accent-red/30 text-accent-red hover:bg-accent-red/25 hover:border-accent-red/50" 
              : "bg-accent-green/15 border border-accent-green/30 text-accent-green hover:bg-accent-green/25 hover:border-accent-green/50"
          }`}
          onClick={() => toggleItem(item)}
        >
          {isItemInKit ? "Remove" : "+ Add"}
        </button>
      </div>
    </div>
  );
}
