import CategoryTile from "./CategoryTile";
import categories from "../_data/categories.json";

export default function CategoryRail() {

  const categoryList = categories.categories;

  return (
    <div className="category-rail h-full flex flex-col justify-between">
      <div>
        {categoryList.map((category) => (
          <CategoryTile key={category} category={category} />
        ))}
      </div>
      <button className="gear-list-button w-full mb-2 border border-neutral-700 rounded flex items-center justify-between py-2 px-4 cursor-pointer hover:border-neutral-600 transition-all duration-300 text-2xl font-bold">Gear List</button>
    </div>
  );
}
