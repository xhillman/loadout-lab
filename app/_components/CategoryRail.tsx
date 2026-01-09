import CategoryTile from "./CategoryTile";
import categories from "../_data/categories.json";

type CategoryRailProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
};

export default function CategoryRail({ selectedCategory, onSelectCategory }: CategoryRailProps) {

  const categoryList = categories.categories;

  return (
    <div className="category-rail h-full flex flex-col justify-between">
      <div>
        {categoryList.map((category) => (
          <CategoryTile key={category} category={category} selectedCategory={selectedCategory} onSelect={onSelectCategory} />
        ))}
      </div>
      <button className="gear-list-button w-full mb-2 border border-neutral-700 rounded flex items-center justify-between py-2 px-4 cursor-pointer hover:border-neutral-600 transition-all duration-300 text-2xl font-bold">Gear List</button>
    </div>
  );
}
