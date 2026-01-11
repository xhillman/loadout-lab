import StatsPanel from "./StatsPanel";
import CoveragePanel from "./CoveragePanel";
import WarningPanel from "./WarningPanel";

import { Category, Kit } from "../_types";

type StatsRailProps = {
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
  categoryList: Category[];
  coverage: Category[];
};

export default function StatsRail({ currentKit, categoryList, coverage }: StatsRailProps) {
  return (
    <div className="stats-rail h-full flex flex-col gap-4 bg-transparent">
      <StatsPanel currentKit={currentKit} />
      <CoveragePanel categoryList={categoryList} coverage={coverage} currentKit={currentKit}/>
      <WarningPanel />
    </div>
  );
}