import { Material } from "@/interfaces/material.interface";

export const checkDuplicates = (materials: Material[] | undefined, storeMaterial: Material[]) => {
    // If materials array is undefined or empty, return an empty array since there are no duplicates
    if (!materials || materials.length === 0) {
        return [];
    }

    // Filter storeMaterial to find duplicates
    return storeMaterial.filter(material => {
        // Check if material is already present in the materials Set
        const isDuplicate = materials.some(existingMaterial => {
            // Check if projectId and code are the same
            if (
                existingMaterial.projectId === material.projectId &&
                existingMaterial.code === material.code
            ) {
                // If projectId and code match, compare the kind (first letter of name)
                const existingKind = existingMaterial.name.charAt(0);
                const newKind = material.name.charAt(0);
                return existingKind === newKind;
            }
            return false;
        });

        return isDuplicate;
    });
};
