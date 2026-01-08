import categories from "../_data/categories.json";
import CoverageTile from "./CoverageTile";

export default function CoveragePanel() {
  const categoryList = categories.categories;

  return (
    <div className="coverage-panel bg-neutral-700 p-4">
      <h2>Survival Coverage</h2>
      {categoryList.map((category) => (
        <CoverageTile key={category} category={category} />
      ))}
    </div>
  );
}