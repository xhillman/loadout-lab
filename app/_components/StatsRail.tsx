import StatsPanel from "./StatsPanel";
import CoveragePanel from "./CoveragePanel";
import WarningPanel from "./WarningPanel";

import { Kit } from "../_types";

type StatsRailProps = {
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
};

export default function StatsRail({ currentKit }: StatsRailProps) {
  return (
    <div className="stats-rail h-full flex flex-col gap-4 bg-transparent">
      <StatsPanel currentKit={currentKit} />
      <CoveragePanel />
      <WarningPanel />
    </div>
  );
}