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
      <ul>
        {categoryList.map((category) => (
          <CategoryTile key={category.name} category={category} selectedCategory={selectedCategory} onSelect={onSelectCategory}/>
        ))}
      </ul>
      <button 
        onClick={() => onSelectCategory("Gear List")}
        className={`gear-list-button w-full mb-2 bg-card-base border rounded-lg flex items-center justify-between py-3 px-4 cursor-pointer shadow-card transition-all duration-200 ease-smooth text-xl font-bold ${
          selectedCategory === "Gear List" 
            ? "border-accent-primary bg-accent-primary/10 text-accent-primary" 
            : "border-border-soft hover:bg-card-hover hover:border-border-base text-text-primary"
        }`}
      >
        Gear List
      </button>
    </div>
  );
}
