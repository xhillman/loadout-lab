import { Category, Kit } from "../_types";
import CoverageTile from "./CoverageTile";

type CoveragePanelProps = {
  categoryList: Category[];
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
};

export default function CoveragePanel({ categoryList, currentKit }: CoveragePanelProps) {

  return (
    <div className="coverage-panel bg-neutral-950/20 p-4 border border-neutral-100/10 rounded shadow-lg/50">
      <h2 className="text-xl font-bold mb-4 border-b border-neutral-100/10 pb-2">SURVIVAL COVERAGE</h2>
      {categoryList.map((category) => (
        <CoverageTile key={category.name} category={category} currentKit={currentKit} />
      ))}
    </div>
  );
}