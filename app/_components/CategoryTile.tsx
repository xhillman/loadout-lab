type CategoryTileProps = {
  category: string;
  selectedCategory: string | null;
  onSelect: (category: string) => void;
};

export default function CategoryTile({
  category,
  selectedCategory,
  onSelect,
}: CategoryTileProps) {
  const isSelected = selectedCategory === category;

  return (
    <li
      className={`category-tile w-full mb-2 border ${
        isSelected
          ? "border-amber-200/40 inset-shadow-sm inset-shadow-amber-400/20 scale-103"
          : "border-neutral-100/10"
      } rounded cursor-pointer hover:brightness-110 hover:border-amber-200/30 hover:scale-103 transition-all duration-200 shadow-lg/50 `}
      onClick={() => onSelect(category)}
    >
      <div
        className={`overlay h-full w-full ${
          isSelected ? "bg-amber-200/10" : "bg-neutral-950/20"
        } rounded flex items-center justify-between py-2 px-4 `}
      >
        <h2 className="text-xl font-bold flex items-center ">{category}</h2>
        <div className="h-4 w-4 rounded-full bg-red-500/90"></div>
      </div>
    </li>
  );
}
