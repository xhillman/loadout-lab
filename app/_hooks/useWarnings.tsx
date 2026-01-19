import { useMemo } from "react";
import { Kit, Warning } from "../_types";

// Core capabilities required per category
const REQUIRED_CAPABILITIES: Record<string, string[]> = {
  water: ['water_storage', 'water_treatment'],
  fire: ['fire_ignition', 'fire_tinder'],
  shelter: ['shelter_overhead', 'shelter_insulation', 'shelter_cordage'],
  food: ['food_calories'],
  medical: ['medical_wound_care'],
  tools: ['tools_illumination', 'tools_cutting'],
};

// Which redundancy groups should have 2+ items for safety
const REDUNDANCY_REQUIREMENTS: Record<string, {
  minCount: number;
  severity: 'critical' | 'warning' | 'info';
  label: string;
}> = {
  fire_ignition: { minCount: 2, severity: 'warning', label: 'fire ignition' },
  water_treatment: { minCount: 2, severity: 'warning', label: 'water treatment' },
  tools_illumination: { minCount: 2, severity: 'info', label: 'illumination' },
};

// Format capability string for display (water_treatment -> "water treatment")
function formatCapability(cap: string): string {
  return cap.replace(/_/g, ' ');
}

export default function useWarnings(
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>
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
