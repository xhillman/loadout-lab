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
      <button className="gear-list-button block">Gear List</button>
    </div>
  );
}
