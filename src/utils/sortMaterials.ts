import { Material } from "@/interfaces";

export const sortMaterials = (materials: Material[]) => {
    return materials.slice().sort((a, b) => {
        // Compare by name
        const nameComparison = a.name.localeCompare(b.name);
        if (nameComparison !== 0) return nameComparison;
        // If names are equal, compare by code
        return a.code.localeCompare(b.code);
    });
};