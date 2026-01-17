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

  // Show confirmation dialog when there's a pending kit to load
  if (pendingKit) {
    return (
      <div className="load-kit-modal modal rounded-lg p-4 bg-card-base border border-border-soft shadow-card fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 min-w-[320px]">
        <h1 className="text-lg font-bold text-text-primary mb-2">Unsaved Changes</h1>
        <p className="text-text-secondary mb-4">You have unsaved changes. Would you like to save your current kit before loading &quot;{pendingKit.name}&quot;?</p>
        
        <div className="mb-4">
          <label htmlFor="save-name" className="block text-text-secondary mb-1">Save current kit as:</label>
          <input 
            type="text" 
            id="save-name" 
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="Enter kit name"
            className="w-full p-2 border border-border-soft rounded-lg bg-surface-1 text-text-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button 
            className="bg-accent-amber/20 border border-accent-amber/30 hover:bg-accent-amber/30 text-base font-bold px-5 py-2 rounded-lg cursor-pointer shadow-card text-text-primary transition-all duration-200 ease-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSaveAndLoad}
            disabled={!saveName.trim()}
          >
            Save & Load
          </button>
          <button 
            className="bg-card-base border border-border-soft hover:bg-card-hover hover:border-accent-amber/30 text-base font-bold px-5 py-2 rounded-lg cursor-pointer shadow-card text-text-primary transition-all duration-200 ease-smooth"
            onClick={handleLoadWithoutSaving}
          >
            Load Without Saving
          </button>
          <button 
            className="bg-card-base border border-border-soft hover:bg-card-hover text-base font-bold px-5 py-2 rounded-lg cursor-pointer shadow-card text-text-secondary transition-all duration-200 ease-smooth"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="load-kit-modal modal rounded-lg p-4 bg-card-base border border-border-soft shadow-card fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <h1 className="text-lg font-bold text-text-primary mb-2">Load Kit</h1>
      <div className="saved-kits">
        {savedKits.length === 0 ? (
          <p className="text-text-secondary mb-4">No saved kits yet.</p>
        ) : (
          savedKits.map((kit) => (
            <div key={kit.id} className="py-2 border-b border-border-soft last:border-b-0">
              <h2 
                className="text-lg font-bold text-text-primary cursor-pointer hover:text-accent-amber transition-colors" 
                onClick={() => handleKitClick(kit)}
              >
                {kit.name}
              </h2>
            </div>
          ))
        )}
      </div>
      <button 
        className="close-button mt-4 bg-card-base border border-border-soft hover:bg-card-hover hover:border-accent-amber/30 text-base font-bold px-5 py-2 rounded-lg cursor-pointer shadow-card btn-primary text-text-primary transition-all duration-200 ease-smooth" 
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  );
}