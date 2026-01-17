import { Kit } from "../_types";

export default function useKitStore() {

  const getCurrentKit = () => {
    const currentKit = sessionStorage.getItem("ll-currentKit");
    if (currentKit) {
      return JSON.parse(currentKit);
    }
    return null;
  }

  const setCurrentKit = (kit: Kit) => {
    sessionStorage.setItem("ll-currentKit", JSON.stringify(kit));
  }

  const getSavedKits = () => {
    const savedKits = localStorage.getItem("ll-savedKits");
    if (savedKits) {
      return JSON.parse(savedKits);
    }
    return [];
  }

  const saveKit = (kit: Kit, name: string) => {
    const kitToSave = {
      ...kit,
      id: crypto.randomUUID(),
      name: name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const savedKits = getSavedKits();
    savedKits.push(kitToSave);
    localStorage.setItem("ll-savedKits", JSON.stringify(savedKits));
  }

  const deleteKit = (kitId: string) => {
    const savedKits = getSavedKits();
    const filteredKits = savedKits.filter((kit: Kit) => kit.id !== kitId);
    localStorage.setItem("ll-savedKits", JSON.stringify(filteredKits));
  }

  const loadKit = (kitId: string) => {
    const savedKits = getSavedKits();
    const kit = savedKits.find((kit: Kit) => kit.id === kitId);
    if (kit) {
      setCurrentKit(kit);
      return kit;
    }
    return null;
  }

  return {
    getCurrentKit,
    setCurrentKit,
    getSavedKits,
    saveKit,
    deleteKit,
    loadKit,
  }
}