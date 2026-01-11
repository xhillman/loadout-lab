import useCategoryCoverage from "../_hooks/useCategoryCoverage";
import { AllIcon, FireIcon, FoodIcon, MedicalIcon, ShelterIcon, ToolsIcon, WaterIcon } from "./Icons";
import { Category, Kit } from "../_types";

type CategoryTileProps = {
  category: Category;
  selectedCategory: string | null;
  onSelect: (category: string) => void;
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
};

export default function CategoryTile({
  category,
  selectedCategory,
  onSelect,
  currentKit,
}: CategoryTileProps) {
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

  const coverageIndicatorColor = useCategoryCoverage(category, currentKit).color;

  return (
    <li
      className={`category-tile w-full mb-2 border ${
        isSelected
          ? "border-amber-200/40 inset-shadow-sm inset-shadow-amber-400/20 scale-103"
          : "border-neutral-100/10"
      } rounded cursor-pointer hover:brightness-110 hover:border-amber-200/30 hover:scale-103 transition-all duration-200 shadow-lg/50 `}
      onClick={() => onSelect(category.name)}
    >
      <div
        className={`overlay h-full w-full ${
          isSelected ? "bg-amber-200/10" : "bg-neutral-950/20"
        } rounded flex items-center justify-between py-2 px-4 `}
      >
        <h2 className="text-xl font-bold flex items-center gap-3">{icon} {category.name}</h2>
        {
          category.name !== "All" && (
            <div className={`h-4 w-4 rounded-full bg-${coverageIndicatorColor}-600/50`}></div>
          )
        }
      </div>
    </li>
  );
}
