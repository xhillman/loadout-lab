export default function ItemCard() {
  return (
    <div className="item-card bg-neutral-800 p-4">
      <div>
              <h2>Item Name</h2>
              <p>8 oz</p>

      </div>
      <div className="item-card-footer flex justify-between items-center">
        <p>$10</p>
        <button>Add</button>
      </div>


    </div>
  );
}