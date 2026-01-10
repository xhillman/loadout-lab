import { Item } from "../_types";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="item-card p-2 border border-neutral-100/10 shadow-lg/50 rounded flex flex-col justify-between min-h-[180px] hover:border-amber-200/30 hover:scale-103 transition-all duration-200">
      <div>
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="text-sm text-blue-100/90 bg-blue-500/30 border border-blue-500/20 w-fit rounded px-2 py-1">{item.weight_oz} oz</p>
      </div>
      <div className="item-card-footer flex justify-between items-end">
        <p className="text-lg font-bold">${item.price_usd}</p>
        <button className="bg-neutral-600/20 border border-neutral-100/20 hover:bg-amber-200/10 hover:border-amber-200/30 text-lg font-bold px-4 py-2 rounded cursor-pointer shadow-md/30 transition-all duration-200">+ Add</button>
      </div>
    </div>
  );
}
