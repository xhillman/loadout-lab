"use client";

import { useState, useMemo } from "react";
import { useKitStore } from "./_stores/useKitStore";

import Header from "./_components/Header";
import CategoryRail from "./_components/CategoryRail";
import ItemBrowser from "./_components/ItemBrowser";
import StatsRail from "./_components/StatsRail";
import SettingsBar from "./_components/SettingsBar";
import SaveKitModal from "./_components/SaveKitModal";
import LoadKitModal from "./_components/LoadKitModal";

import items from "./_data/items.json";
import categories from "./_data/categories.json";
import { Item, Category } from "./_types";

const itemList: Item[] = items as Item[];
const categoryList: Category[] = categories.categories as Category[];  

export default function Home() {

  // Store state and actions
  const { 
    kit, 
    isDirty, 
    savedKits,
    loadKit, 
    saveCurrentKit, 
    deleteKit, 
    renameKit, 
    markClean 
  } = useKitStore();

  // UI state (local only)
  const [selectedCategory, setSelectedCategory] = useState<string | null>("All");
  const [isSaveKitModalOpen, setIsSaveKitModalOpen] = useState(false);
  const [isLoadKitModalOpen, setIsLoadKitModalOpen] = useState(false);

  const itemsToDisplay = useMemo(() => {
    if (selectedCategory === "Gear List") {
      return kit.items;
    }
    if (!selectedCategory || selectedCategory === "All") {
      return itemList;
    }
    return itemList.filter((item) => 
      item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory, kit.items]);

  // Modal handlers
  const handleSaveKitClick = () => {
    setIsSaveKitModalOpen(!isSaveKitModalOpen);
  };

  const handleLoadKitClick = () => {
    setIsLoadKitModalOpen(!isLoadKitModalOpen);
  };

  // Kit actions
  const handleLoadKit = (kitToLoad: typeof kit) => {
    loadKit(kitToLoad);
    setIsLoadKitModalOpen(false);
  };

  const handleSaveAndLoad = (kitToLoad: typeof kit, saveName: string) => {
    saveCurrentKit(saveName);
    loadKit(kitToLoad);
    setIsLoadKitModalOpen(false);
  };

  return (
    <div className="app font-rajdhani text-text-primary h-screen flex flex-col overflow-hidden">
      <Header onSaveKitClick={handleSaveKitClick} onLoadKitClick={handleLoadKitClick} />
      <SettingsBar />
      <main className="flex-1 grid grid-cols-12 overflow-hidden">
        <div className="col-span-2 h-full bg-surface-1/50 border-r border-border-soft p-4 shadow-panel overflow-hidden">
          <CategoryRail selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory}/>
        </div>
        <div className="col-span-7 h-full bg-bg-base/30 overflow-y-auto">
          <ItemBrowser selectedCategory={selectedCategory} itemList={itemsToDisplay}/>
        </div>
        <div className="col-span-3 h-full bg-surface-1/50 border-l border-border-soft p-4 shadow-panel overflow-hidden">
          <StatsRail categoryList={categoryList} />
        </div>
      </main>
      <SaveKitModal isOpen={isSaveKitModalOpen} closeModal={handleSaveKitClick} kit={kit} onSaveComplete={markClean} />
      <LoadKitModal 
        isOpen={isLoadKitModalOpen} 
        closeModal={handleLoadKitClick} 
        setCurrentKit={handleLoadKit} 
        savedKits={savedKits}
        isDirty={isDirty}
        onSaveAndLoad={handleSaveAndLoad}
        onDeleteKit={deleteKit}
        onRenameKit={renameKit}
      />
    </div>
  );
}
