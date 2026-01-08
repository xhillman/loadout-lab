import { Item } from "../_types";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="item-card p-2 border border-neutral-700 rounded flex flex-col justify-between min-h-[180px] hover:bg-neutral-900/50 hover:scale-105 transition-all duration-300">
      <div>
        <h2 className="text-lg font-bold">{item.name}</h2>
        <p className="text-sm text-amber-200/90 bg-amber-500/10 border border-amber-500/10 w-fit rounded px-2 py-1">{item.weight_oz} oz</p>
      </div>
      <div className="item-card-footer flex justify-between items-center">
        <p className="text-lg font-bold">${item.price_usd}</p>
        <button className="bg-neutral-600/20 hover:bg-neutral-600/40 text-lg font-bold px-4 py-2 rounded cursor-pointer">+ Add</button>
      </div>
    </div>
  );
}
