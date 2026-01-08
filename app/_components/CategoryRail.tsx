import CategoryTile from "./CategoryTile";

export default function CategoryRail() {
  const categories = [
    "All",
    "Water",
    "Fire",
    "Shelter",
    "Food",
    "Medical",
    "Tools",
  ];

  return (
    <div className="category-rail h-full flex flex-col justify-between">
      <div>
        {categories.map((category) => (
          <CategoryTile key={category} category={category} />
        ))}
      </div>
      <button className="gear-list-button block">Gear List</button>
    </div>
  );
}
