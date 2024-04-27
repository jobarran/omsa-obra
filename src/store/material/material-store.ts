import { create } from "zustand";
import { Material } from '../../interfaces';

interface State {
    storeMaterial: Material[] | null;
    setStoreMaterial: (material: Material) => void;
    deleteStoreMaterial: (materialCode: string) => void;
    emptyStoreMaterial: () => void
}

export const useMaterialStore = create<State>((set) => ({

    storeMaterial: [],
    setStoreMaterial: (newMaterial) =>
        set((state) => ({
            storeMaterial: state.storeMaterial ? [...state.storeMaterial, newMaterial] : [newMaterial],
        })),
    deleteStoreMaterial: (materialCodeToDelete) =>
        set((state) => ({
            storeMaterial: state.storeMaterial ? state.storeMaterial.filter(material => material.code !== materialCodeToDelete) : [],
        })),
    emptyStoreMaterial: () => set({ storeMaterial: [] }),
}));