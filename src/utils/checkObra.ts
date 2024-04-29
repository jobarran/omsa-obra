import { Material } from "@/interfaces/material.interface";

export const checkObra = (projectId: string | undefined, storeMaterial: Material[]) => {
    // If storeMaterial array is undefined or empty, return an empty array since there are no different materials
    if (!storeMaterial || storeMaterial.length === 0) {
        return [];
    }

    // Filter storeMaterial to find materials with different projectId
    const differentObraMaterials = storeMaterial.filter(material => {
        return material.projectId !== projectId;
    });

    return differentObraMaterials;
};