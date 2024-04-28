import { create } from "zustand";
import { Material } from '../../interfaces';

interface State {
    storeMaterial: Material[] | null;
    setStoreMaterial: (material: Material | Material[]) => void;
    deleteStoreMaterial: (materialCode: string) => void;
    emptyStoreMaterial: () => void;
    isMaterialDuplicated: boolean;
    errorMessage: string | null;
    setIsMaterialDuplicated: (errorMessage: string) => void; 
    isLoadingMaterial: boolean;
    setIsLoadingMaterial: (isLoading: boolean) => void

}

export const useMaterialStore = create<State>((set) => ({

    storeMaterial: [],
    setStoreMaterial: (newMaterialOrMaterials) =>
        set((state) => {
            let updatedStoreMaterial;
            if (Array.isArray(newMaterialOrMaterials)) {
                updatedStoreMaterial = state.storeMaterial ? [...state.storeMaterial, ...newMaterialOrMaterials] : [...newMaterialOrMaterials];
            } else {
                updatedStoreMaterial = state.storeMaterial ? [...state.storeMaterial, newMaterialOrMaterials] : [newMaterialOrMaterials];
            }
            return { storeMaterial: updatedStoreMaterial };
        }),
    deleteStoreMaterial: (materialCodeToDelete) =>
        set((state) => ({
            storeMaterial: state.storeMaterial ? state.storeMaterial.filter(material => material.code !== materialCodeToDelete) : [],
        })),
    emptyStoreMaterial: () => set({ storeMaterial: [] }),
    isMaterialDuplicated: false,
    errorMessage: null,
    setIsMaterialDuplicated: (errorMessage:string) => { 
        set({ isMaterialDuplicated: true, errorMessage }); 
        setTimeout(() => {
            set({ isMaterialDuplicated: false, errorMessage: null }); 
        }, 5000); 
    },
    isLoadingMaterial: false,
    setIsLoadingMaterial: (isLoading: boolean) => set({ isLoadingMaterial: isLoading }), // Updated function signature
}));