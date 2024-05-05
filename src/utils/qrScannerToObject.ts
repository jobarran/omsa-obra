import { Material, MaterialType } from "@/interfaces";
import { materialTypes } from "./materialTypes";


export const qrScannerToObject = (scannedQr: string, possition?: string, observations?: string): Material => {

    // Split the QR string to extract projectId, name, and code
    const [projectId, name, code] = scannedQr.split('-');
    const type = materialTypes(name)

    // Create a new material object with the specified format
    const material: Material = {
        code,
        name: name.toUpperCase(),
        type,
        quantity: "1",
        status: "recibido",
        projectId,
        received: null,
        installed: null,
        possition: possition ? possition : null,
        observations: observations ? observations : null,
        tracking: null
    };

    return material;

};