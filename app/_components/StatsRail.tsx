import StatsPanel from "./StatsPanel";
import CoveragePanel from "./CoveragePanel";
import WarningPanel from "./WarningPanel";

import { Category } from "../_types";

type StatsRailProps = {
  categoryList: Category[];
};

export default function StatsRail({ categoryList }: StatsRailProps) {
  return (
    <div className="stats-rail h-full flex flex-col gap-5 overflow-hidden">
      <StatsPanel />
      <CoveragePanel categoryList={categoryList} />
      <div className="flex-1 min-h-0">
        <WarningPanel />
      </div>
    </div>
  );
}