"use client";

import { useState, useMemo, useEffect } from "react";

import useKitStore from "./_hooks/useKitStore";

import Header from "./_components/Header";
import CategoryRail from "./_components/CategoryRail";
import ItemBrowser from "./_components/ItemBrowser";
import StatsRail from "./_components/StatsRail";
import SettingsBar from "./_components/SettingsBar";
import SaveKitModal from "./_components/SaveKitModal";
import LoadKitModal from "./_components/LoadKitModal";

import items from "./_data/items.json";
import categories from "./_data/categories.json";
import { Item, Kit, Category } from "./_types";

const itemList: Item[] = items as Item[];
const categoryList: Category[] = categories.categories as Category[];  

export default function Home() {

  const { getCurrentKit, setCurrentKit, getSavedKits, saveKit, deleteKit, renameKit } = useKitStore();

  const [isDirty, setIsDirty] = useState(false);


  const [selectedCategory, setSelectedCategory] = useState<string | null>("All");
  const itemsToDisplay = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") {
      return itemList;
    }
    return itemList.filter((item) => 
      item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  const [budget, setBudget] = useState(300);
  const [maxWeight, setMaxWeight] = useState(400);

  const [kit, setKit] = useState<Kit>({
    id: "",
    name: "Untitled Kit",
    created_at: "",
    updated_at: "",
    items: [],
    constraints: {
      max_weight_oz: maxWeight,
      max_budget_usd: budget,
    },
  });

  useEffect(() => {
    const currentKit = getCurrentKit();
    if (currentKit) {
      setKit(currentKit);
    } else {
      setKit(prev => ({
        ...prev,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isSaveKitModalOpen, setIsSaveKitModalOpen] = useState(false);

  const handleSaveKitClick = () => {
    setIsSaveKitModalOpen(!isSaveKitModalOpen);
  }

  const [isLoadKitModalOpen, setIsLoadKitModalOpen] = useState(false);
  const [savedKits, setSavedKits] = useState<Kit[]>([]);
  

const handleLoadKit = () => {
  const savedKits = getSavedKits();
  setSavedKits(savedKits);
}

  const handleLoadKitClick = () => {
    setIsLoadKitModalOpen(!isLoadKitModalOpen);
    handleLoadKit();
  }

  const handleSetCurrentKit = (loadedKit: Kit) => {
    setKit(loadedKit);
    setCurrentKit(loadedKit);
    setIsDirty(false);
    setIsLoadKitModalOpen(false);
  }

  const handleSaveAndLoad = (kitToLoad: Kit, saveName: string) => {
    saveKit(kit, saveName);
    setKit(kitToLoad);
    setCurrentKit(kitToLoad);
    setIsDirty(false);
    setIsLoadKitModalOpen(false);
  }

  const handleDeleteKit = (kitId: string) => {
    deleteKit(kitId);
    setSavedKits(getSavedKits());
  }

  const handleRenameKit = (kitId: string, newName: string) => {
    renameKit(kitId, newName);
    setSavedKits(getSavedKits());
  }

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(event.target.value));
    setKit((prevKit) => ({
      ...prevKit,
      constraints: {
        ...prevKit.constraints,
        max_budget_usd: Number(event.target.value),
      },
    }));
    setIsDirty(true);
  }
  const handleMaxWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxWeight(Number(event.target.value));
    setKit((prevKit) => ({
      ...prevKit,
      constraints: {
        ...prevKit.constraints,
        max_weight_oz: Number(event.target.value),
      },
    }));
    setIsDirty(true);
  }

  const toggleItemInKit = (item: Item) => {
    const isItemInKit = kit.items.some((kitItem) => kitItem.id === item.id);
    const newKit = {
      ...kit,
      items: isItemInKit ? kit.items.filter((kitItem) => kitItem.id !== item.id) : [...kit.items, item],
    }
    setKit(newKit);
    setCurrentKit(newKit);
    setIsDirty(true);
  }

  return (
    <div className="app font-rajdhani text-text-primary h-screen flex flex-col overflow-hidden">
      <Header onSaveKitClick={handleSaveKitClick} onLoadKitClick={handleLoadKitClick} />
      <SettingsBar budget={budget} maxWeight={maxWeight} onBudgetChange={handleBudgetChange} onMaxWeightChange={handleMaxWeightChange} />
      <main className="flex-1 grid grid-cols-12 overflow-hidden">
        <div className="col-span-2 h-full bg-surface-1/50 border-r border-border-soft p-4 shadow-panel overflow-hidden">
          <CategoryRail selectedCategory={selectedCategory} onSelectCategory={(category) => setSelectedCategory(category)} currentKit={kit}/>
        </div>
        <div className="col-span-7 h-full bg-bg-base/30 overflow-y-auto">
          <ItemBrowser selectedCategory={selectedCategory} itemList={itemsToDisplay} toggleItemInKit={toggleItemInKit} currentKit={kit} />
        </div>
        <div className="col-span-3 h-full bg-surface-1/50 border-l border-border-soft p-4 shadow-panel overflow-hidden">
          <StatsRail currentKit={kit} categoryList={categoryList} budget={budget} maxWeight={maxWeight} />
        </div>
      </main>
      <SaveKitModal isOpen={isSaveKitModalOpen} closeModal={handleSaveKitClick} kit={kit} onSaveComplete={() => setIsDirty(false)} />
      <LoadKitModal 
        isOpen={isLoadKitModalOpen} 
        closeModal={handleLoadKitClick} 
        setCurrentKit={handleSetCurrentKit} 
        savedKits={savedKits}
        isDirty={isDirty}
        onSaveAndLoad={handleSaveAndLoad}
        onDeleteKit={handleDeleteKit}
        onRenameKit={handleRenameKit}
      />
    </div>
  );
}
