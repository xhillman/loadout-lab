import useCategoryCoverage from "../_hooks/useCategoryCoverage";
import { Category, Kit } from "../_types";

type CoverageTileProps = {
  category: Category;
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
};

export default function CoverageTile({ category, currentKit }: CoverageTileProps) {

const { visiblePercentage, actualPercentage, color } = useCategoryCoverage(category, currentKit);

const transitionTime = visiblePercentage * 10;

  if (category.name !== "All") {
    return (
      <div className="coverage-tile flex justify-between items-center mb-2">
        <h3 className="mr-2">{category.name}</h3>
        <div className="coverage-bar flex-1 bg-neutral-100/10 rounded h-4">
          <div className={`coverage-bar-fill h-full bg-${color}-600/50`} style={{ width: `${visiblePercentage}%`, transition: `width ${transitionTime}ms linear` }}></div>
        </div>
        <p className="font-bold ml-2 w-[calc(4ch+0.1rem)] text-left">{actualPercentage}%</p>
      </div>
    );
  }
}
