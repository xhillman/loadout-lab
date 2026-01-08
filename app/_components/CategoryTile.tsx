export default function CategoryTile({ category }: { category: string }) {
  return (
    <div className="category-tile w-full mb-2 border border-neutral-700 rounded flex items-center justify-between py-2 px-4 cursor-pointer hover:border-neutral-600 transition-all duration-300">
      <h2 className="text-2xl font-bold flex items-center ">{category}</h2>
      <div className="h-4 w-4 rounded-full bg-red-500/90"></div>
    </div>
  );
}