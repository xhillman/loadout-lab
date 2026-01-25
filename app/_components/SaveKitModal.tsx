"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useKitStore } from "../_stores/useKitStore";

type SaveKitModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function SaveKitModal({ isOpen, closeModal }: SaveKitModalProps) {
  const { saveCurrentKit } = useKitStore();
  const [kitName, setKitName] = useState("");

  const handleSave = () => {
    if (kitName.trim()) {
      saveCurrentKit(kitName.trim());
      setKitName("");
      closeModal();
    }
  };

  const handleClose = () => {
    setKitName("");
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Save Kit"
      description="Give your kit a name to save it for later."
    >
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
    </Modal>
  );
}