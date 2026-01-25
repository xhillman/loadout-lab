// Core capabilities required per category
export const REQUIRED_CAPABILITIES: Record<string, string[]> = {
  water: ['water_storage', 'water_treatment'],
  fire: ['fire_ignition', 'fire_tinder'],
  shelter: ['shelter_overhead', 'shelter_insulation', 'shelter_cordage'],
  food: ['food_calories'],
  medical: ['medical_wound_care'],
  tools: ['tools_illumination', 'tools_cutting'],
};

// Which redundancy groups should have 2+ items for safety
export const REDUNDANCY_REQUIREMENTS: Record<string, {
  minCount: number;
  severity: 'critical' | 'warning' | 'info';
  label: string;
}> = {
  fire_ignition: { minCount: 2, severity: 'warning', label: 'fire ignition' },
  water_treatment: { minCount: 2, severity: 'warning', label: 'water treatment' },
  tools_illumination: { minCount: 2, severity: 'info', label: 'illumination' },
};