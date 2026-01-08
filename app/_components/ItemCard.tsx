import { Item } from "../_types";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="item-card bg-neutral-800 p-4 rounded flex flex-col justify-between h-[150px]">
      <div>
              <h2>{item.name}</h2>
              <p>{item.weight_oz} oz</p>

      </div>
      <div className="item-card-footer flex justify-between items-center">
        <p>${item.price_usd}</p>
        <button>Add</button>
      </div>


    </div>
  );
}