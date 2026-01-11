import { Category, Kit } from "../_types";

export default function useCategoryCoverage(
  category: Category,
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>
) {
  const threshold = category.coverage;
  const current = currentKit.items
    .filter(item => item.category === category.name.toLowerCase())
    .reduce((sum, item) => sum + item.coverage_contribution, 0);
  
  const actualPercentage = (current / threshold) * 100;
  const visiblePercentage = Math.min(actualPercentage, 100);
  const color = actualPercentage <= 30 ? 'red' : actualPercentage <= 70 ? 'yellow' : 'green';
  
  return { visiblePercentage, actualPercentage, color, current, threshold };
}
