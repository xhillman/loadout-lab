"use client";

import { useState, useMemo, useEffect } from "react";

import useKitStore from "./_hooks/useKitStore";

import Header from "./_components/Header";
import CategoryRail from "./_components/CategoryRail";
import ItemBrowser from "./_components/ItemBrowser";
import StatsRail from "./_components/StatsRail";
import SettingsBar from "./_components/SettingsBar";

import items from "./_data/items.json";
import categories from "./_data/categories.json";
import { Item, Kit, Category } from "./_types";

const itemList: Item[] = items as Item[];
const categoryList: Category[] = categories.categories as Category[];  

export default function Home() {

  const { getCurrentKit, setCurrentKit } = useKitStore();

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

  const currentKit = getCurrentKit();

  const [kit, setKit] = useState<Kit>({
    id: currentKit?.id || "",
    name: currentKit?.name || "Untitled Kit",
    created_at: currentKit?.created_at || new Date().toISOString(),
    updated_at: currentKit?.updated_at || new Date().toISOString(),
    items: currentKit?.items || [],
    constraints: {
      max_weight_oz: currentKit?.constraints.max_weight_oz || maxWeight,
      max_budget_usd: currentKit?.constraints.max_budget_usd || budget,
    },
  });

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(event.target.value));
    setKit((prevKit) => ({
      ...prevKit,
      constraints: {
        ...prevKit.constraints,
        max_budget_usd: Number(event.target.value),
      },
    }));
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
  }

  const toggleItemInKit = (item: Item) => {
    const isItemInKit = kit.items.some((kitItem) => kitItem.id === item.id);
    const newKit = {
      ...kit,
      items: isItemInKit ? kit.items.filter((kitItem) => kitItem.id !== item.id) : [...kit.items, item],
    }
    setKit(newKit);
    setCurrentKit(newKit);
  }

  useEffect(() => {
    console.log(kit);
  }, [kit]);

  return (
    <div className="app font-rajdhani text-text-primary">
      <Header />
      <SettingsBar budget={budget} maxWeight={maxWeight} onBudgetChange={handleBudgetChange} onMaxWeightChange={handleMaxWeightChange} />
      <main className="grid grid-cols-12 min-h-[calc(100vh-110px)]">
        <div className="col-span-2 h-full bg-surface-1/50 border-r border-border-soft p-4 shadow-panel">
          <CategoryRail selectedCategory={selectedCategory} onSelectCategory={(category) => setSelectedCategory(category)} currentKit={kit}/>
        </div>
        <div className="col-span-7 h-full bg-bg-base/30">
          <ItemBrowser selectedCategory={selectedCategory} itemList={itemsToDisplay} toggleItemInKit={toggleItemInKit} currentKit={kit} />
        </div>
        <div className="col-span-3 h-full bg-surface-1/50 border-l border-border-soft p-4 shadow-panel">
          <StatsRail currentKit={kit} categoryList={categoryList} budget={budget} maxWeight={maxWeight} />
        </div>
      </main>
    </div>
  );
}
