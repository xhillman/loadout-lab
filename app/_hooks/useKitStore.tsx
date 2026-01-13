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
    return localStorage.getItem("ll-savedKits");
  }

  const saveKit = (kit: Kit) => {
    const savedKits = getSavedKits();
    if (savedKits) {
      const savedKitsArray = JSON.parse(savedKits);
      savedKitsArray.push(kit);
      localStorage.setItem("ll-savedKits", JSON.stringify(savedKitsArray));
    } else {
      localStorage.setItem("ll-savedKits", JSON.stringify([kit]));
    }
    localStorage.setItem("ll-savedKits", JSON.stringify(kit));
  }

  const deleteKit = (kitId: string) => {
    const savedKits = getSavedKits();
    if (savedKits) {
      const savedKitsArray = JSON.parse(savedKits);
      const filteredKits = savedKitsArray.filter((kit: Kit) => kit.id !== kitId);
      localStorage.setItem("ll-savedKits", JSON.stringify(filteredKits));
    }
  }

  const loadKit = (kitId: string) => {
    const savedKits = getSavedKits();
    if (savedKits) {
      const savedKitsArray = JSON.parse(savedKits);
      const kit = savedKitsArray.find((kit: Kit) => kit.id === kitId);
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