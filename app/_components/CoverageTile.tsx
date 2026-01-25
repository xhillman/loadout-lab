import useCategoryCoverage from "../_hooks/useCategoryCoverage";
import { Category, WorkingKit } from "../_types";

type CoverageTileProps = {
  category: Category;
  currentKit: WorkingKit;
};

export default function CoverageTile({ category, currentKit }: CoverageTileProps) {

const { visiblePercentage, actualPercentage, color } = useCategoryCoverage(category, currentKit);

const transitionTime = visiblePercentage * 10;

  if (category.name !== "All") {
    return (
      <div className="coverage-tile flex justify-between items-center mb-3">
        <h3 className="mr-3 text-text-secondary text-sm font-medium w-16">{category.name}</h3>
        <div className="coverage-bar flex-1 bg-bg-deep rounded-full h-2 overflow-hidden border border-border-soft">
          <div className={`coverage-bar-fill h-full bg-${color}-600/50 rounded-full`} style={{ width: `${visiblePercentage}%`, transition: `width ${transitionTime}ms linear` }}></div>
        </div>
        <p className="font-bold ml-3 w-[calc(4ch+0.1rem)] text-left text-text-primary text-sm">{actualPercentage}%</p>
      </div>
    );
  }
}
