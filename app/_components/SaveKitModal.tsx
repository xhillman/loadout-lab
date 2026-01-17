"use client";

import { useState } from "react";
import useKitStore from "../_hooks/useKitStore";
import { Kit } from "../_types";

type SaveKitModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  kit: Kit;
  onSaveComplete?: () => void;
};

export default function SaveKitModal({ isOpen, closeModal, kit, onSaveComplete }: SaveKitModalProps) {
  const { saveKit } = useKitStore();
  const [kitName, setKitName] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (kitName.trim()) {
      saveKit(kit, kitName.trim());
      setKitName("");
      closeModal();
      onSaveComplete?.();
    }
  };

  const handleClose = () => {
    setKitName("");
    closeModal();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 min-w-[340px] rounded-xl p-6 bg-card-base border border-border-soft shadow-2xl">
        <h1 className="text-xl font-bold text-text-primary mb-1">Save Kit</h1>
        <p className="text-text-secondary text-sm mb-5">Give your kit a name to save it for later.</p>

        <div className="mb-5">
          <label htmlFor="kit-name" className="block text-text-secondary text-sm mb-2">Kit Name</label>
          <input 
            type="text" 
            id="kit-name" 
            name="kit-name" 
            value={kitName}
            placeholder="Enter kit name"
            className="w-full p-3 border border-border-soft rounded-lg bg-surface-1 text-text-primary focus:outline-none focus:border-accent-amber/50 transition-colors" 
            onChange={(e) => setKitName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
        </div>

        <div className="flex gap-3">
          <button 
            className="flex-1 bg-accent-amber/20 border border-accent-amber/30 hover:bg-accent-amber/30 text-base font-bold px-5 py-3 rounded-lg cursor-pointer shadow-card text-text-primary transition-all duration-200 ease-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={!kitName.trim()}
          >
            Save Kit
          </button>
          <button 
            className="flex-1 bg-card-base border border-border-soft hover:bg-card-hover text-base font-bold px-5 py-3 rounded-lg cursor-pointer shadow-card text-text-secondary transition-all duration-200 ease-smooth" 
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}