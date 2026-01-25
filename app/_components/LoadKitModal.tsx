"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import { useKitStore } from "../_stores/useKitStore";
import { Kit } from "../_types";

type LoadKitModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function LoadKitModal({ 
  isOpen, 
  closeModal, 
}: LoadKitModalProps) {

  const { isDirty, savedKits, loadKit, saveCurrentKit, deleteKit, renameKit } = useKitStore();

  const [pendingKit, setPendingKit] = useState<Kit | null>(null);
  const [saveName, setSaveName] = useState("");
  
  // Menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [renamingKitId, setRenamingKitId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deletingKit, setDeletingKit] = useState<Kit | null>(null);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus rename input when entering rename mode
  useEffect(() => {
    if (renamingKitId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renamingKitId]);

  if (!isOpen) return null;

  const handleKitClick = (kit: Kit) => {
    if (renamingKitId) return; // Don't load while renaming
    if (isDirty) {
      setPendingKit(kit);
    } else {
      loadKit(kit);
      closeModal();
    }
  };

  const handleSaveAndLoad = () => {
    if (pendingKit && saveName.trim()) {
      saveCurrentKit(saveName.trim());
      loadKit(pendingKit);
      setPendingKit(null);
      setSaveName("");
      closeModal();
    }
  };

  const handleLoadWithoutSaving = () => {
    if (pendingKit) {
      loadKit(pendingKit);
      setPendingKit(null);
      setSaveName("");
      closeModal();
    }
  };

  const handleCancel = () => {
    setPendingKit(null);
    setSaveName("");
  };

  const handleClose = () => {
    setPendingKit(null);
    setSaveName("");
    setOpenMenuId(null);
    setRenamingKitId(null);
    setDeletingKit(null);
    closeModal();
  };

  const handleMenuToggle = (e: React.MouseEvent<HTMLButtonElement>, kitId: string) => {
    e.stopPropagation();
    if (openMenuId === kitId) {
      setOpenMenuId(null);
      setMenuPosition(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 40,
      });
      setOpenMenuId(kitId);
    }
  };

  const handleRenameClick = (kit: Kit) => {
    setRenamingKitId(kit.id);
    setRenameValue(kit.name);
    setOpenMenuId(null);
  };

  const handleRenameSubmit = (kitId: string) => {
    if (renameValue.trim()) {
      renameKit(kitId, renameValue.trim());
    }
    setRenamingKitId(null);
    setRenameValue("");
  };

  const handleRenameCancel = () => {
    setRenamingKitId(null);
    setRenameValue("");
  };

  const handleDeleteClick = (kit: Kit) => {
    setDeletingKit(kit);
    setOpenMenuId(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingKit) {
      deleteKit(deletingKit.id);
      setDeletingKit(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingKit(null);
  };

  // Show delete confirmation dialog
  if (deletingKit) {
    return (
      <Modal
        isOpen
        onClose={handleDeleteCancel}
        title="Delete Kit"
        description={
          <>
            Are you sure you want to delete <span className="text-red-400 font-semibold">&quot;{deletingKit.name}&quot;</span>? This action cannot be undone.
          </>
        }
        width="md"
      >
        <div className="flex flex-col gap-2">
          <button 
            className="bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-base font-bold px-5 py-3 rounded-lg cursor-pointer shadow-card text-red-400 transition-all duration-200 ease-smooth"
            onClick={handleDeleteConfirm}
          >
            Delete Kit
          </button>
          <button 
            className="bg-card-base border border-border-soft hover:bg-card-hover text-base font-bold px-5 py-3 rounded-lg cursor-pointer shadow-card text-text-secondary transition-all duration-200 ease-smooth"
            onClick={handleDeleteCancel}
          >
            Cancel
          </button>
        </div>
      </Modal>
    );
  }

  // Show confirmation dialog when there's a pending kit to load
  if (pendingKit) {
    return (
      <Modal
        isOpen
        onClose={handleCancel}
        title="Unsaved Changes"
        description={
          <>
            Save your current kit before loading <span className="text-accent-amber font-semibold">&quot;{pendingKit.name}&quot;</span>?
          </>
        }
        width="md"
      >
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
      </Modal>
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
        
        <div className="saved-kits max-h-[300px] overflow-y-auto mb-5 pr-4">
          {savedKits.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-secondary">No saved kits yet.</p>
              <p className="text-text-secondary/60 text-sm mt-1">Save a kit to see it here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {savedKits.map((kit) => (
                <div
                  key={kit.id}
                  className="relative w-full text-left p-3 rounded-lg border border-border-soft bg-surface-1/50 hover:bg-surface-1 hover:border-accent-amber/30 transition-all duration-200 cursor-pointer group"
                  onClick={() => handleKitClick(kit)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {renamingKitId === kit.id ? (
                        <input
                          ref={renameInputRef}
                          type="text"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onKeyDown={(e) => {
                            e.stopPropagation();
                            if (e.key === "Enter") handleRenameSubmit(kit.id);
                            if (e.key === "Escape") handleRenameCancel();
                          }}
                          onBlur={() => handleRenameSubmit(kit.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full text-base font-bold bg-surface-1 border border-accent-amber/50 rounded px-2 py-1 text-text-primary focus:outline-none focus:border-accent-amber"
                        />
                      ) : (
                        <h2 className="text-base font-bold text-text-primary group-hover:text-accent-amber transition-colors truncate">
                          {kit.name}
                        </h2>
                      )}
                      <p className="text-text-secondary/60 text-xs mt-1">
                        {kit.items.length} items
                      </p>
                    </div>
                    
                    {/* Three-dot menu button */}
                    <button
                      onClick={(e) => handleMenuToggle(e, kit.id)}
                      className="p-1.5 rounded-md hover:bg-surface-1 text-text-secondary hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Kit options"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="8" cy="3" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="8" cy="13" r="1.5" />
                      </svg>
                    </button>
                  </div>
                </div>
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

      {/* Floating dropdown menu */}
      {openMenuId && menuPosition && (
        <div 
          ref={menuRef}
          className="fixed w-36 bg-card-base border border-border-soft rounded-lg shadow-xl z-60 overflow-hidden -translate-y-1/2"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              const kit = savedKits.find(k => k.id === openMenuId);
              if (kit) handleRenameClick(kit);
            }}
            className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-1 transition-colors flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            </svg>
            Rename
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const kit = savedKits.find(k => k.id === openMenuId);
              if (kit) handleDeleteClick(kit);
            }}
            className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
            Delete
          </button>
        </div>
      )}
    </>
  );
}
