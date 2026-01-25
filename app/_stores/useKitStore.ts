// app/_stores/useKitStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Kit, Item } from '../_types';

type KitState = {
  // Current working kit
  kit: Kit;
  isDirty: boolean;
  
  // Saved kits (persisted to localStorage)
  savedKits: Kit[];
  
  // Actions
  setKit: (kit: Kit) => void;
  updateConstraints: (constraints: Partial<Kit['constraints']>) => void;
  toggleItem: (item: Item) => void;
  
  // Persistence actions
  saveCurrentKit: (name: string) => void;
  loadKit: (kit: Kit) => void;
  deleteKit: (kitId: string) => void;
  renameKit: (kitId: string, newName: string) => void;
  
  // Reset dirty state
  markClean: () => void;
};

const createEmptyKit = (): Kit => ({
  id: '',
  name: 'Untitled Kit',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  items: [],
  constraints: {
    max_weight_oz: 400,
    max_budget_usd: 300,
  },
});

export const useKitStore = create<KitState>()(
  persist(
    (set, get) => ({
      kit: createEmptyKit(),
      isDirty: false,
      savedKits: [],

      setKit: (kit) => set({ kit, isDirty: true }),

      updateConstraints: (constraints) => set((state) => ({
        kit: {
          ...state.kit,
          constraints: { ...state.kit.constraints, ...constraints },
        },
        isDirty: true,
      })),

      toggleItem: (item) => set((state) => {
        const isInKit = state.kit.items.some((i) => i.id === item.id);
        return {
          kit: {
            ...state.kit,
            items: isInKit
              ? state.kit.items.filter((i) => i.id !== item.id)
              : [...state.kit.items, item],
          },
          isDirty: true,
        };
      }),

      saveCurrentKit: (name) => set((state) => {
        const kitToSave: Kit = {
          ...state.kit,
          id: crypto.randomUUID(),
          name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        return {
          savedKits: [...state.savedKits, kitToSave],
          isDirty: false,
        };
      }),

      loadKit: (kit) => set({ kit, isDirty: false }),

      deleteKit: (kitId) => set((state) => ({
        savedKits: state.savedKits.filter((k) => k.id !== kitId),
      })),

      renameKit: (kitId, newName) => set((state) => ({
        savedKits: state.savedKits.map((k) =>
          k.id === kitId
            ? { ...k, name: newName, updated_at: new Date().toISOString() }
            : k
        ),
      })),

      markClean: () => set({ isDirty: false }),
    }),
    {
      name: 'loadout-lab-storage',
      partialize: (state) => ({ 
        kit: state.kit, 
        savedKits: state.savedKits 
      }),
    }
  )
);