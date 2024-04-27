interface QRData {
    obra: string;
    nombre: string;
    id: string;
    tipo: string;
}

export const qrTableData = (scannedQr: string[] | null): QRData[] => {
    const data: QRData[] = [];

    scannedQr?.forEach(item => {
        const [obra = "", nombre = "", id = ""] = item.split("-");
        const tipo = nombre.startsWith("M") ? "Modulo" : nombre.startsWith("E") ? "Pista" : "";

        data.push({ obra, nombre, id, tipo });
    });

    return data;
};