import CategoryTile from "./CategoryTile";
import categories from "../_data/categories.json";
import { Kit } from "../_types";

type CategoryRailProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
};

export default function CategoryRail({ selectedCategory, onSelectCategory, currentKit }: CategoryRailProps) {

  const categoryList = categories.categories;

  return (
    <div className="category-rail h-full flex flex-col justify-between">
      <ul>
        {categoryList.map((category) => (
          <CategoryTile key={category.name} category={category} selectedCategory={selectedCategory} onSelect={onSelectCategory} currentKit={currentKit} />
        ))}
      </ul>
      <button className="gear-list-button w-full mb-2 border border-neutral-100/10 rounded flex items-center justify-between py-2 px-4 cursor-pointer hover:border-neutral-600 transition-all duration-200 text-xl font-bold">Gear List</button>
    </div>
  );
}
