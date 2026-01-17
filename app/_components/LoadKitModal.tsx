"use client";

import { useState } from "react";
import { Kit } from "../_types";

type LoadKitModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  setCurrentKit: (kit: Kit) => void;
  savedKits: Kit[];
  isDirty: boolean;
  onSaveAndLoad: (kitToLoad: Kit, saveName: string) => void;
};

export default function LoadKitModal({ 
  isOpen, 
  closeModal, 
  setCurrentKit, 
  savedKits, 
  isDirty, 
  onSaveAndLoad 
}: LoadKitModalProps) {

  const [pendingKit, setPendingKit] = useState<Kit | null>(null);
  const [saveName, setSaveName] = useState("");

  if (!isOpen) return null;

  const handleKitClick = (kit: Kit) => {
    if (isDirty) {
      setPendingKit(kit);
    } else {
      setCurrentKit(kit);
    }
  };

  const handleSaveAndLoad = () => {
    if (pendingKit && saveName.trim()) {
      onSaveAndLoad(pendingKit, saveName.trim());
      setPendingKit(null);
      setSaveName("");
    }
  };

  const handleLoadWithoutSaving = () => {
    if (pendingKit) {
      setCurrentKit(pendingKit);
      setPendingKit(null);
      setSaveName("");
    }
  };

  const handleCancel = () => {
    setPendingKit(null);
    setSaveName("");
  };

  const handleClose = () => {
    setPendingKit(null);
    setSaveName("");
    closeModal();
  };

  // Show confirmation dialog when there's a pending kit to load
  if (pendingKit) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={handleCancel}
        />
        
        {/* Confirmation Modal */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 min-w-[360px] rounded-xl p-6 bg-card-base border border-border-soft shadow-2xl">
          <h1 className="text-xl font-bold text-text-primary mb-1">Unsaved Changes</h1>
          <p className="text-text-secondary text-sm mb-5">
            Save your current kit before loading <span className="text-accent-amber font-semibold">&quot;{pendingKit.name}&quot;</span>?
          </p>
          
          <div className="mb-5">
            <label htmlFor="save-name" className="block text-text-secondary text-sm mb-2">Save current kit as:</label>
            <input 
              type="text" 
              id="save-name" 
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName.trim() && handleSaveAndLoad()}
              placeholder="Enter kit name"
              className="w-full p-3 border border-border-soft rounded-lg bg-surface-1 text-text-primary focus:outline-none focus:border-accent-amber/50 transition-colors"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <button 
              className="bg-accent-amber/20 border border-accent-amber/30 hover:bg-accent-amber/30 text-base font-bold px-5 py-3 rounded-lg cursor-pointer shadow-card text-text-primary transition-all duration-200 ease-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSaveAndLoad}
              disabled={!saveName.trim()}
            >
              Save & Load
            </button>
            <button 
              className="bg-card-base border border-border-soft hover:bg-card-hover hover:border-accent-amber/30 text-base font-bold px-5 py-3 rounded-lg cursor-pointer shadow-card text-text-primary transition-all duration-200 ease-smooth"
              onClick={handleLoadWithoutSaving}
            >
              Load Without Saving
            </button>
            <button 
              className="bg-card-base border border-border-soft hover:bg-card-hover text-base font-bold px-5 py-3 rounded-lg cursor-pointer shadow-card text-text-secondary transition-all duration-200 ease-smooth"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 min-w-[340px] max-w-[400px] rounded-xl p-6 bg-card-base border border-border-soft shadow-2xl">
        <h1 className="text-xl font-bold text-text-primary mb-1">Load Kit</h1>
        <p className="text-text-secondary text-sm mb-5">Select a saved kit to load.</p>
        
        <div className="saved-kits max-h-[300px] overflow-y-auto mb-5">
          {savedKits.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-secondary">No saved kits yet.</p>
              <p className="text-text-secondary/60 text-sm mt-1">Save a kit to see it here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {savedKits.map((kit) => (
                <button
                  key={kit.id}
                  className="w-full text-left p-3 rounded-lg border border-border-soft bg-surface-1/50 hover:bg-surface-1 hover:border-accent-amber/30 transition-all duration-200 cursor-pointer group"
                  onClick={() => handleKitClick(kit)}
                >
                  <h2 className="text-base font-bold text-text-primary group-hover:text-accent-amber transition-colors">
                    {kit.name}
                  </h2>
                  <p className="text-text-secondary/60 text-xs mt-1">
                    {kit.items.length} items
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button 
          className="w-full bg-card-base border border-border-soft hover:bg-card-hover text-base font-bold px-5 py-3 rounded-lg cursor-pointer shadow-card text-text-secondary transition-all duration-200 ease-smooth" 
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
}