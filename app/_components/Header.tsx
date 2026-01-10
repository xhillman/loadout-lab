import LoadKitButton from "./LoadKitButton";
import SaveKitButton from "./SaveKitButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-transparent">
      <h1 className="text-3xl font-bold">Loadout Lab</h1>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold">72 Hour Urban Survival Kit</h2>
      </div>
      <div className="action-buttons flex gap-6">
        <SaveKitButton />
        <LoadKitButton />
      </div>
    </header>
  );
}