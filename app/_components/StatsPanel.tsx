"use client";

import { useMemo } from "react";

import { Kit } from "../_types";

type StatsPanelProps = {
  currentKit: Omit<Kit, 'id' | 'created_at' | 'updated_at'>;
  budget: number;
  maxWeight: number;
};

function WarningIcon() {
  return (
    <svg className="w-4 h-4 text-red-400 inline-block ml-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
}

export default function StatsPanel({ currentKit, maxWeight, budget }: StatsPanelProps) {

  const currentKitWeight = useMemo(() => {
    return currentKit.items.reduce((currentWeight, item) => currentWeight + item.weight_oz, 0);
  }, [currentKit]);

  const currentKitCost = useMemo(() => {
    return currentKit.items.reduce((currentCostUsd, item) => currentCostUsd + item.price_usd, 0);
  }, [currentKit]);

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
            <WarningIcon />
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
            <WarningIcon />
          </span>
        </p>
      </div>

      <div className="px-3 py-2 -mx-1">
        <p className="font-bold text-text-secondary">
          Items: <span className="text-text-primary">{currentKit.items.length}</span>
        </p>
      </div>
    </div>
  );
}
