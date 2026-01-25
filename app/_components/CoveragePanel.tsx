import { Category } from "../_types";
import CoverageTile from "./CoverageTile";

type CoveragePanelProps = {
  categoryList: Category[];
};

export default function CoveragePanel({ categoryList }: CoveragePanelProps) {

  return (
    <div className="coverage-panel panel rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 border-b border-border-base pb-2 text-text-primary tracking-wide">SURVIVAL COVERAGE</h2>
      {categoryList.map((category) => (
        <CoverageTile key={category.name} category={category} />
      ))}
    </div>
  );
}