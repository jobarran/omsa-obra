import { create } from "zustand";
import { Material } from '../../interfaces';

interface State {
    storeMaterial: Material[] | null;
    setStoreMaterial: (material: Material | Material[]) => void;
    deleteStoreMaterial: (materialCode: string) => void;
    emptyStoreMaterial: () => void;
    isMaterialError: boolean;
    errorMessage: string | null;
    setIsMaterialError: (errorMessage: string) => void;
    isLoadingMaterial: boolean;
    setIsLoadingMaterial: (isLoading: boolean) => void
    isMaterialSavedSuccess: boolean;
    setIsMaterialSavedSuccess: () => void;
    isAddMaterialManuallyModal: boolean;
    setIsAddMaterialManuallyModal: () => void;

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
    isMaterialError: false,
    errorMessage: null,
    setIsMaterialError: (errorMessage: string) => {
        set({ isMaterialError: true, errorMessage });
        setTimeout(() => {
            set({ isMaterialError: false, errorMessage: null });
        }, 5000);
    },
    isLoadingMaterial: false,
    setIsLoadingMaterial: (isLoading: boolean) => set({ isLoadingMaterial: isLoading }),
    isMaterialSavedSuccess: false,
    setIsMaterialSavedSuccess: () => {
        set({ isMaterialSavedSuccess: true });
        setTimeout(() => {
            set({ isMaterialSavedSuccess: false });
        }, 5000);
    },
    isAddMaterialManuallyModal: false,
    setIsAddMaterialManuallyModal: () => {
        set((state) => ({ isAddMaterialManuallyModal: !state.isAddMaterialManuallyModal }));
    }
}));