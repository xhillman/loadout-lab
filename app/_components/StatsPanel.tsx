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
    <div className="stats-panel panel rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 border-b border-border-base pb-2 text-text-primary tracking-wide">LOADOUT STATS</h2>
      <p className="font-bold mb-2 text-text-secondary">Weight: <span className="text-text-primary">{currentKitWeight} lbs</span> / {maxKitWeight} lbs</p>
      <p className="font-bold mb-2 text-text-secondary">Cost: <span className="text-text-primary">${currentKitCost}</span> / ${currentKit.constraints.max_budget_usd}</p>
      <p className="font-bold text-text-secondary">Items: <span className="text-text-primary">{currentKit.items.length}</span></p>
    </div>
  );
}