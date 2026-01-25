"use client";

import { useKitStore } from "../_stores/useKitStore";

export default function SettingsBar() {

const { kit, updateConstraints } = useKitStore();

const budget = kit.constraints.max_budget_usd;
const maxWeight = kit.constraints.max_weight_oz;

const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  updateConstraints({ max_budget_usd: Number(event.target.value) });
};

const handleMaxWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  updateConstraints({ max_weight_oz: Number(event.target.value) });
};

  return (
    <div className="settings-bar flex items-center justify-center gap-6 py-3 bg-surface-1/40 border-b border-border-soft">
      
      <div className="flex items-center gap-2">
        <label htmlFor="budget" className="text-text-secondary text-xl font-bold">Budget:</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
          <input 
            type="number" 
            value={budget} 
            onChange={handleBudgetChange}
            id="budget" 
            className="w-20 pl-7 pr-2 py-1.5 bg-card-base border border-border-soft rounded-lg text-text-primary text-lg focus:border-border-strong focus:outline-none transition-colors" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <label htmlFor="weight" className="text-text-secondary text-xl font-bold">Max Weight:</label>
        <div className="relative">
          <input 
            type="number" 
            value={maxWeight} 
            onChange={handleMaxWeightChange}
            id="weight" 
            className="w-20 px-3 py-1.5 bg-card-base border border-border-soft rounded-lg text-text-primary text-lg focus:border-border-strong focus:outline-none transition-colors" 
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">oz</span>
        </div>
      </div>
    </div>
  );
}