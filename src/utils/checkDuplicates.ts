import { Material } from "@/interfaces/material.interface";

export const checkDuplicates = (materials: Material[] | undefined, storeMaterial: Material[]) => {
    // If materials array is undefined or empty, return an empty array since there are no duplicates
    if (!materials || materials.length === 0) {
        return [];
    }

    // Convert materials to a Set of strings for efficient comparison
    const materialSet = new Set(materials.map(material => JSON.stringify(material)));

    // Filter storeMaterial to find duplicates
    return storeMaterial.filter(material => {
        // Check if material is already present in the materials Set
        const isDuplicate = materials.some(existingMaterial =>
            existingMaterial.code === material.code &&
            existingMaterial.name === material.name &&
            existingMaterial.projectId === material.projectId
        );

        return isDuplicate;
    });
};