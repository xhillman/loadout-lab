"use client";

import { useKitStore } from "../_stores/useKitStore";
import { useMemo } from "react";

import { WarningIcon } from "./Icons";

export default function StatsPanel() {

  const { kit } = useKitStore();

  const maxWeight = kit.constraints.max_weight_oz;
  const budget = kit.constraints.max_budget_usd;

  const currentKitWeight = useMemo(() => {
    return kit.items.reduce((currentWeight, item) => currentWeight + item.weight_oz, 0);
  }, [kit.items]);

  const currentKitCost = useMemo(() => {
    return kit.items.reduce((currentCostUsd, item) => currentCostUsd + item.price_usd, 0);
  }, [kit.items]);

  const isOverWeight = currentKitWeight > maxWeight;
  const isOverBudget = currentKitCost > budget;

  return (
    <div className="stats-panel panel rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 border-b border-border-base pb-2 text-text-primary tracking-wide">LOADOUT STATS</h2>
      
      <div className={`mb-2 rounded-md px-3 py-2 -mx-1 border transition-colors ${
        isOverWeight 
          ? 'bg-red-950/60 border-red-500/40' 
          : 'bg-transparent border-transparent'
      }`}>
        <p className={`font-bold flex items-center ${isOverWeight ? 'text-red-400' : 'text-text-secondary'}`}>
          <span>Weight:</span>
          <span className={`ml-1 ${isOverWeight ? 'text-red-400' : 'text-text-primary'}`}>
            {currentKitWeight.toFixed(1)} oz
          </span>
          <span className="mx-1">/</span>
          <span>{maxWeight} oz</span>
          <span className={`ml-2 transition-opacity ${isOverWeight ? 'opacity-100' : 'opacity-0'}`}>
            <WarningIcon severity="warning" />
          </span>
        </p>
      </div>

      <div className={`mb-2 rounded-md px-3 py-2 -mx-1 border transition-colors ${
        isOverBudget 
          ? 'bg-red-950/60 border-red-500/40' 
          : 'bg-transparent border-transparent'
      }`}>
        <p className={`font-bold flex items-center ${isOverBudget ? 'text-red-400' : 'text-text-secondary'}`}>
          <span>Cost:</span>
          <span className={`ml-1 ${isOverBudget ? 'text-red-400' : 'text-text-primary'}`}>
            ${currentKitCost.toFixed(2)}
          </span>
          <span className="mx-1">/</span>
          <span>${budget}</span>
          <span className={`ml-2 transition-opacity ${isOverBudget ? 'opacity-100' : 'opacity-0'}`}>
            <WarningIcon severity="critical" />
          </span>
        </p>
      </div>

      <div className="px-3 py-2 -mx-1">
        <p className="font-bold text-text-secondary">
          Items: <span className="text-text-primary">{kit.items.length}</span>
        </p>
      </div>
    </div>
  );
}
