"use client";

import { useState, useMemo } from "react";

import Header from "./_components/Header";
import CategoryRail from "./_components/CategoryRail";
import ItemBrowser from "./_components/ItemBrowser";
import StatsRail from "./_components/StatsRail";

import items from "./_data/items.json";
import { Item } from "./_types";

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

  return (
    <div className="app font-mono">
      <Header />
      <main className="grid grid-cols-12 min-h-[calc(100vh-80px)]">
        <div className="col-span-2 h-full bg-neutral-950 p-4">
          <CategoryRail selectedCategory={selectedCategory} onSelectCategory={(category) => setSelectedCategory(category)}/>
        </div>
        <div className="col-span-7 h-full bg-neutral-950">
          <ItemBrowser selectedCategory={selectedCategory} itemList={itemsToDisplay} />
        </div>
        <div className="col-span-3 h-full bg-neutral-950 p-4">
          <StatsRail />
        </div>
      </main>
    </div>
  );
}
