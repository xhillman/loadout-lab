"use client";

import { useKitStore } from "../_stores/useKitStore";
import useCategoryCoverage from "../_hooks/useCategoryCoverage";
import { AllIcon, FireIcon, FoodIcon, MedicalIcon, ShelterIcon, ToolsIcon, WaterIcon } from "./Icons";
import { Category } from "../_types";

type CategoryTileProps = {
  category: Category;
  selectedCategory: string | null;
  onSelect: (category: string) => void;
};

export default function CategoryTile({
  category,
  selectedCategory,
  onSelect
}: CategoryTileProps) {

  const { kit } = useKitStore();

  const isSelected = selectedCategory === category.name;

  const icon = {
    "Water": <WaterIcon />,
    "Fire": <FireIcon />,
    "Food": <FoodIcon />,
    "Shelter": <ShelterIcon />,
    "Medical": <MedicalIcon />,
    "Tools": <ToolsIcon />,
    "All": <AllIcon />,
  }[category.name];

  const coverageIndicatorColor = useCategoryCoverage(category, kit).color;

  const colorClasses = {
    red: "bg-red-600/50 ring-red-600/20",
    yellow: "bg-yellow-600/50 ring-yellow-600/20",
    green: "bg-green-600/50 ring-green-600/20",
  } as const;

  return (
    <li
      className={`category-tile w-full mb-2 rounded-lg cursor-pointer ${
        isSelected
          ? "card-active scale-[1.02] transition-all duration-200 ease-smooth"
          : "card-interactive hover:scale-[1.02]"
      }`}
      onClick={() => onSelect(category.name)}
    >
      <div className="h-full w-full rounded-lg flex items-center justify-between py-3 px-4">
        <h2 className="text-lg font-bold flex items-center gap-3 text-text-primary">{icon} {category.name}</h2>
        {
          category.name !== "All" && (
            <div className={`h-3 w-3 rounded-full ${colorClasses[coverageIndicatorColor]} ring-2`}></div>
          )
        }
      </div>
    </li>
  );
}
