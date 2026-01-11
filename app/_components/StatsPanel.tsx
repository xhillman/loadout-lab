"use client";

import { useState, useMemo } from "react";

import { Kit } from "../_types";

type StatsPanelProps = {
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
};

export default function StatsPanel({ currentKit }: StatsPanelProps) {

  const [maxKitWeight, setMaxKitWeight] = useState(currentKit.constraints.max_weight_oz / 16);

  const currentKitWeight = useMemo(() => {
    return currentKit.items.reduce((currentWeightLbs, item) => currentWeightLbs + (item.weight_oz / 16), 0).toFixed(2);
  }, [currentKit]);

  const currentKitCost = useMemo(() => {
    return currentKit.items.reduce((currentCostUsd, item) => currentCostUsd + item.price_usd, 0).toFixed(2);
  }, [currentKit]);

  return (
    <div className="stats-panel bg-neutral-950/20 p-4 border border-neutral-100/10 rounded shadow-lg/50">
      <h2 className="text-xl font-bold mb-4 border-b border-neutral-100/10 pb-2">LOADOUT STATS</h2>
      <p className="font-bold mb-2">Weight: {currentKitWeight} lbs / {maxKitWeight} lbs</p>
      <p className="font-bold mb-2">Cost: ${currentKitCost} / ${currentKit.constraints.max_budget_usd}</p>
      <p className="font-bold">Items: {currentKit.items.length}</p>
    </div>
  );
}