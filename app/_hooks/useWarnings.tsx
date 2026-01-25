import { useMemo } from "react";
import { Warning, WorkingKit } from "../_types";
import { REQUIRED_CAPABILITIES, REDUNDANCY_REQUIREMENTS } from "../_constants/capabilities";

// Format capability string for display (water_treatment -> "water treatment")
function formatCapability(cap: string): string {
  return cap.replace(/_/g, ' ');
}

export default function useWarnings(
  currentKit: WorkingKit
): Warning[] {
  return useMemo(() => {
    const warnings: Warning[] = [];
    const providedCapabilities = new Set<string>();
    const redundancyGroups: Record<string, number> = {};
    const missingDependencies: Record<string, boolean> = {};

    // Track which categories have items
    const categoriesWithItems = new Set<string>();

    // First pass: collect what's provided and count redundancy groups
    currentKit.items.forEach(item => {
      categoriesWithItems.add(item.category);
      item.provides?.forEach(cap => providedCapabilities.add(cap));
      if (item.redundancy_group) {
        redundancyGroups[item.redundancy_group] = 
          (redundancyGroups[item.redundancy_group] || 0) + 1;
      }
    });

    // Second pass: collect missing item dependencies (deduped by capability)
    currentKit.items.forEach(item => {
      item.requires?.forEach(req => {
        if (!providedCapabilities.has(req)) {
          missingDependencies[req] = true;
        }
      });
    });

    // Generate warnings for missing item dependencies
    Object.keys(missingDependencies).forEach(capability => {
      warnings.push({
        id: `dep-${capability}`,
        type: 'missing_dependency',
        severity: 'critical',
        category: capability.split('_')[0],
        message: `No ${formatCapability(capability)} in kit`,
      });
    });

    // Check for missing CORE capabilities in categories that have items
    categoriesWithItems.forEach(category => {
      const requiredCaps = REQUIRED_CAPABILITIES[category] || [];
      requiredCaps.forEach(cap => {
        // Only warn if not already covered by a dependency warning
        if (!providedCapabilities.has(cap) && !missingDependencies[cap]) {
          warnings.push({
            id: `core-${cap}`,
            type: 'missing_dependency',
            severity: 'warning',
            category: category,
            message: `No ${formatCapability(cap)} in kit`,
          });
        }
      });
    });

    // Check for redundancy requirements
    Object.entries(REDUNDANCY_REQUIREMENTS).forEach(([group, config]) => {
      const count = redundancyGroups[group] || 0;
      // Only warn if they have at least one item but not enough for redundancy
      if (count > 0 && count < config.minCount) {
        warnings.push({
          id: `redundancy-${group}`,
          type: 'no_redundancy',
          severity: config.severity,
          category: group.split('_')[0],
          message: `No backup ${config.label}`,
        });
      }
    });

    // Sort by severity (critical first, then warning, then info)
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    warnings.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return warnings;
  }, [currentKit.items]);
}
