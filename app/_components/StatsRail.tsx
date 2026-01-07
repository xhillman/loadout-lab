import StatsPanel from "./StatsPanel";
import CoveragePanel from "./CoveragePanel";
import WarningPanel from "./WarningPanel";

export default function StatsRail() {
  return (
    <div>
      <h2>Stats Rail</h2>
      <StatsPanel />
      <CoveragePanel />
      <WarningPanel />
    </div>
  );
}