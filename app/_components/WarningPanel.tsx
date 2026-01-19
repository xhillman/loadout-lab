import { Kit, Warning } from "../_types";
import useWarnings from "../_hooks/useWarnings";

type WarningPanelProps = {
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
};

function WarningIcon({ severity }: { severity: Warning['severity'] }) {
  if (severity === 'critical') {
    return (
      <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  }
  if (severity === 'warning') {
    return (
      <svg className="w-4 h-4 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  );
}

export default function WarningPanel({ currentKit }: WarningPanelProps) {
  const warnings = useWarnings(currentKit);

  return (
    <div className="warning-panel panel rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 border-b border-border-base pb-2 text-text-primary tracking-wide">
        WARNINGS {warnings.length > 0 && <span className="text-text-muted text-base font-normal">({warnings.length})</span>}
      </h2>
      
      {currentKit.items.length === 0 ? (
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
  );
}
