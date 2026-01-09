type CategoryTileProps = {
  category: string;
  selectedCategory: string | null;
  onClick: () => void;
};

export default function CategoryTile({ category, selectedCategory, onClick }: CategoryTileProps) {


  const isSelected = selectedCategory === category;

  return (
    <div className={`category-tile w-full mb-2 border ${isSelected ? "border-amber-500 inset-shadow-sm inset-shadow-amber-500/50" : "border-neutral-700"} rounded flex items-center justify-between py-2 px-4 cursor-pointer hover:bg-neutral-900/50 transition-all duration-300`} onClick={onClick}>
      <h2 className="text-2xl font-bold flex items-center ">{category}</h2>
      <div className="h-4 w-4 rounded-full bg-red-500/90"></div>
    </div>
  );
}