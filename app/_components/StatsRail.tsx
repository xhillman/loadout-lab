import StatsPanel from "./StatsPanel";
import CoveragePanel from "./CoveragePanel";
import WarningPanel from "./WarningPanel";

import { Category, Kit } from "../_types";

type StatsRailProps = {
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
  categoryList: Category[];
  budget: number;
  maxWeight: number;
};

export default function StatsRail({ currentKit, categoryList, budget, maxWeight }: StatsRailProps) {
  return (
    <div className="stats-rail h-full flex flex-col gap-5">
      <StatsPanel currentKit={currentKit} budget={budget} maxWeight={maxWeight} />
      <CoveragePanel categoryList={categoryList} currentKit={currentKit}/>
      <WarningPanel />
    </div>
  );
}