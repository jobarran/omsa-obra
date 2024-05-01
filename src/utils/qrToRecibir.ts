import { Material, MaterialType } from "@/interfaces";


export const qrToRecibir = (scannedQr: string[], received: string): Material[] => {
    // Array to store parsed materials
    const materials: Material[] = [];

    // Iterate through each scanned QR string
    for (const qrString of scannedQr) {
        // Split the QR string to extract projectId, name, and code
        const [projectId, name, code] = qrString.split('-');

         // Determine the type based on the starting character of the name
         let type: MaterialType;
         if (name.startsWith("M")) {
             type = "modulo";
         } else if (name.startsWith("E")) {
             type = "pista";
         } else {
             type = "varios";
         }

        // Create a new material object with the specified format
        const material: Material = {
            code,
            name,
            type,
            quantity: "1",
            status: "recibido",
            projectId,
            received: received,
            installed: null,
            tracking: null
        };

        // Push the material object to the array
        materials.push(material);
    }
    return materials;
};