"use client";

import { useState, useMemo, useEffect } from "react";

import Header from "./_components/Header";
import CategoryRail from "./_components/CategoryRail";
import ItemBrowser from "./_components/ItemBrowser";
import StatsRail from "./_components/StatsRail";
import SettingsBar from "./_components/SettingsBar";

import items from "./_data/items.json";
import { Item, Kit } from "./_types";

const itemList: Item[] = items as Item[];

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const itemsToDisplay = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") {
      return itemList;
    }
    return itemList.filter((item) => 
      item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  const [currentKit, setCurrentKit] = useState<Omit<Kit, 'id' | 'created_at' | 'updated_at'>>({
    name: "Untitled Kit",
    items: [],
    constraints: {
      max_weight_oz: 400,
      max_budget_usd: 300,
    },
  });

  const toggleItemInKit = (item: Item) => {
    setCurrentKit((prevKit) => ({
      ...prevKit,
      items: prevKit.items.includes(item) ? prevKit.items.filter((kitItem) => kitItem.id !== item.id) : [...prevKit.items, item],
    }));
  }

  useEffect(() => {
    console.log(currentKit);
  }, [currentKit]);

  return (
    <div className="app font-rajdhani">
      <Header />
      <SettingsBar />
      <main className="grid grid-cols-12 min-h-[calc(100vh-110px)]">
        <div className="col-span-2 h-full bg-transparent p-4 shadow-xl/60">
          <CategoryRail selectedCategory={selectedCategory} onSelectCategory={(category) => setSelectedCategory(category)}/>
        </div>
        <div className="col-span-7 h-full bg-transparent">
          <ItemBrowser selectedCategory={selectedCategory} itemList={itemsToDisplay} toggleItemInKit={toggleItemInKit} currentKit={currentKit} />
        </div>
        <div className="col-span-3 h-full bg-transparent p-4 shadow-xl/60">
          <StatsRail currentKit={currentKit} />
        </div>
      </main>
    </div>
  );
}
