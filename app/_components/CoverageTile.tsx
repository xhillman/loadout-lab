import { Category, Kit } from "../_types";

type CoverageTileProps = {
  category: Category;
  coverage: Category[];
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
};

export default function CoverageTile({ category, coverage, currentKit }: CoverageTileProps) {


const categoryCoverageThreshold = coverage.find((c) => c.name === category.name)?.coverage || 0;
const categoryCoverage = currentKit.items.filter((item) => item.category === category.name.toLowerCase()).reduce((currentCoverage, item) => currentCoverage + item.coverage_contribution, 0);
let coveragePercentage = Number(((categoryCoverage / categoryCoverageThreshold) * 100).toFixed(2));
const coveragePercentageHolding = coveragePercentage;
if (coveragePercentage > 100) {
  coveragePercentage = 100;
}

const transitionTime = coveragePercentage * 10;

let coverageColor = "";
if (coveragePercentage >= 0 && coveragePercentage <= 30) {
  coverageColor = "bg-red-600/50";
} else if (coveragePercentage >= 31 && coveragePercentage <= 70) {
  coverageColor = "bg-yellow-600/50";
} else if (coveragePercentage >= 71 && coveragePercentage <= 100) {
  coverageColor = "bg-green-600/50";
} else {
  coverageColor = "bg-neutral-100/10";
}

  if (category.name !== "All") {
    return (
      <div className="coverage-tile flex justify-between items-center mb-2">
        <h3 className="mr-2">{category.name}</h3>
        <div className="coverage-bar flex-1 bg-neutral-100/10 rounded h-4">
          <div className={`coverage-bar-fill h-full ${coverageColor}`} style={{ width: `${coveragePercentage}%`, transition: `width ${transitionTime}ms linear` }}></div>
        </div>
        <p className="font-bold ml-2 w-[calc(4ch+0.1rem)] text-left">{coveragePercentageHolding}%</p>
      </div>
    );
  }
}
