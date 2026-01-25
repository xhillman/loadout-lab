import { Category, WorkingKit } from "../_types";

// Core capabilities required per category to unlock full coverage potential
const REQUIRED_CAPABILITIES: Record<string, string[]> = {
  water: ['water_storage', 'water_treatment'],
  fire: ['fire_ignition', 'fire_tinder'],
  shelter: ['shelter_overhead', 'shelter_insulation', 'shelter_cordage'],
  food: ['food_calories'],
  medical: ['medical_wound_care'],
  tools: ['tools_illumination', 'tools_cutting'],
};

// Cap percentage when missing core capabilities
const MISSING_CAPABILITY_CAP = 70;

export default function useCategoryCoverage(
  category: Category,
  currentKit: WorkingKit
) {
  const categoryKey = category.name.toLowerCase();
  const threshold = category.coverage;
  
  // Get items in this category
  const categoryItems = currentKit.items.filter(
    item => item.category === categoryKey
  );
  
  // Calculate raw point total
  const current = categoryItems.reduce(
    (sum, item) => sum + item.coverage_contribution, 0
  );
  
  // Collect all capabilities provided by items in this category
  const providedCapabilities = new Set<string>();
  categoryItems.forEach(item => {
    item.provides?.forEach(cap => providedCapabilities.add(cap));
  });
  
  // Check if all required capabilities are present
  const requiredCaps = REQUIRED_CAPABILITIES[categoryKey] || [];
  const missingCapabilities = requiredCaps.filter(
    cap => !providedCapabilities.has(cap)
  );
  const hasAllRequiredCapabilities = missingCapabilities.length === 0;
  
  // Calculate percentages
  const rawPercentage = threshold > 0 ? (current / threshold) * 100 : 0;
  
  // Apply cap if missing core capabilities
  const actualPercentage = Math.round(
    hasAllRequiredCapabilities 
      ? rawPercentage 
      : Math.min(rawPercentage, MISSING_CAPABILITY_CAP)
  );
  
  // Visible percentage maxes at 100 for the progress bar
  const visiblePercentage = Math.min(actualPercentage, 100);
  
  // Color based on actual (possibly capped) percentage
  const color: "red" | "yellow" | "green" = actualPercentage <= 30 ? 'red' 
    : actualPercentage <= 70 ? 'yellow' 
    : 'green';
  
  return { 
    visiblePercentage, 
    actualPercentage, 
    color, 
    current, 
    threshold,
    isCapped: !hasAllRequiredCapabilities && rawPercentage > MISSING_CAPABILITY_CAP,
    missingCapabilities,
  };
}
