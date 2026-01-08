import LoadKitButton from "./LoadKitButton";
import SaveKitButton from "./SaveKitButton";
import SettingsBar from "./SettingsBar";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-neutral-700">
      <h1>Loadout Lab</h1>
      <div className="flex flex-col items-center">
        <h2>72 Hour Urban Survival Kit</h2>
        <SettingsBar />
      </div>
      <div className="action-buttons flex gap-6">
        <SaveKitButton />
        <LoadKitButton />
      </div>
    </header>
  );
}