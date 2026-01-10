import categories from "../_data/categories.json";
import CoverageTile from "./CoverageTile";

export default function CoveragePanel() {
  const categoryList = categories.categories;

  return (
    <div className="coverage-panel bg-neutral-950/20 p-4 border border-neutral-100/10 rounded shadow-lg/50">
      <h2 className="text-xl font-bold mb-4 border-b border-neutral-100/10 pb-2">SURVIVAL COVERAGE</h2>
      {categoryList.map((category) => (
        <CoverageTile key={category} category={category} />
      ))}
    </div>
  );
}