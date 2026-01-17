import LoadKitButton from "./LoadKitButton";
import SaveKitButton from "./SaveKitButton";

type HeaderProps = {
  onSaveKitClick: () => void;
  onLoadKitClick: () => void;
};

export default function Header({ onSaveKitClick, onLoadKitClick }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 bg-surface-2/60">
      <h1 className="text-3xl font-bold text-text-primary tracking-wide">Loadout Lab</h1>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-text-primary">72 Hour Urban Survival Kit</h2>
      </div>
      <div className="action-buttons flex gap-4">
        <SaveKitButton onSaveKitClick={onSaveKitClick} />
        <LoadKitButton onLoadKitClick={onLoadKitClick} />
      </div>
    </header>
  );
}