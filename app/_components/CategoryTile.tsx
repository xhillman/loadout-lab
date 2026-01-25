import useCategoryCoverage from "../_hooks/useCategoryCoverage";
import { AllIcon, FireIcon, FoodIcon, MedicalIcon, ShelterIcon, ToolsIcon, WaterIcon } from "./Icons";
import { Category, WorkingKit } from "../_types";

type CategoryTileProps = {
  category: Category;
  selectedCategory: string | null;
  onSelect: (category: string) => void;
  currentKit: WorkingKit;
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
            <div className={`h-3 w-3 rounded-full bg-${coverageIndicatorColor}-600/50 ring-2 ring-${coverageIndicatorColor}-600/20`}></div>
          )
        }
      </div>
    </li>
  );
}
