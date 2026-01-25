import useWarnings from "../_hooks/useWarnings";
import { WarningIcon } from "./Icons";
import { useKitStore } from "../_stores/useKitStore";

export default function WarningPanel() {

  const { kit } = useKitStore();
  const warnings = useWarnings(kit);

  return (
    <div className="warning-panel panel rounded-lg p-4 h-full flex flex-col overflow-hidden">
      <h2 className="text-xl font-bold mb-4 border-b border-border-base pb-2 text-text-primary tracking-wide shrink-0">
        WARNINGS {warnings.length > 0 && <span className="text-text-muted text-base font-normal">({warnings.length})</span>}
      </h2>
      
      <div className="flex-1 min-h-0 overflow-y-auto">
        {kit.items.length === 0 ? (
          <p className="text-text-muted text-sm">Add items to see coverage analysis</p>
        ) : warnings.length === 0 ? (
          <p className="text-green-500 text-sm">✓ No issues detected</p>
        ) : (
          <ul className="space-y-2">
            {warnings.map(warning => (
              <li key={warning.id} className="flex items-start gap-2 text-sm">
                <WarningIcon severity={warning.severity} />
                <span className={
                  warning.severity === 'critical' ? 'text-red-400' :
                  warning.severity === 'warning' ? 'text-yellow-400' :
                  'text-blue-300'
                }>
                  {warning.message}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
