import useCategoryCoverage from "../_hooks/useCategoryCoverage";
import { useKitStore } from "../_stores/useKitStore";
import { Category } from "../_types";

type CoverageTileProps = {
  category: Category;
};

export default function CoverageTile({ category }: CoverageTileProps) {

const { kit } = useKitStore();

const { visiblePercentage, actualPercentage, color } = useCategoryCoverage(category, kit);

const transitionTime = visiblePercentage * 10;

const colorClasses = {
  red: "bg-red-600/50",
  yellow: "bg-yellow-600/50",
  green: "bg-green-600/50",
} as const;

  if (category.name !== "All") {
    return (
      <div className="coverage-tile flex justify-between items-center mb-3">
        <h3 className="mr-3 text-text-secondary text-sm font-medium w-16">{category.name}</h3>
        <div className="coverage-bar flex-1 bg-bg-deep rounded-full h-2 overflow-hidden border border-border-soft">
          <div className={`coverage-bar-fill h-full ${colorClasses[color]} rounded-full`} style={{ width: `${visiblePercentage}%`, transition: `width ${transitionTime}ms linear` }}></div>
        </div>
        <p className="font-bold ml-3 w-[calc(4ch+0.1rem)] text-left text-text-primary text-sm">{actualPercentage}%</p>
      </div>
    );
  }
}
