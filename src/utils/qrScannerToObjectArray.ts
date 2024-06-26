import { Material, MaterialType } from "@/interfaces";
import { materialTypes } from "./materialTypes";

export const qrScannerToObjectArray = (scannedQrs: string[]): Material[] => {
    return scannedQrs.map(scannedQr => {
        // Split the QR string to extract projectId, name, and code
        const [projectId, name, code] = scannedQr.split('-');
        const type = materialTypes(name);

        // Create a new material object with the specified format
        const material: Material = {
            code,
            name,
            type,
            quantity: "1",
            status: "recibido",
            projectId,
            received: null,
            installed: null,
            possition: null,
            observations: null,
            tracking: null
        };

        return material;
    });
};