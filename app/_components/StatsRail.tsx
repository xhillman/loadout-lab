import StatsPanel from "./StatsPanel";
import CoveragePanel from "./CoveragePanel";
import WarningPanel from "./WarningPanel";

export default function StatsRail() {
  return (
    <div className="stats-rail h-full flex flex-col gap-4">
      <StatsPanel />
      <CoveragePanel />
      <WarningPanel />
    </div>
  );
}