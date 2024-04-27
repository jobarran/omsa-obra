import { create } from "zustand";


interface State {

    isQrScannerOpen: boolean
    openQrScanner: () => void
    closeQrScanner: () => void
    scannedQr: string[] | null
    setScannedQr: (qr: string) => void
    deleteScannedQr: (qr: string) => void
    editScannedQr: (oldQr: string, newQr: string) => void
    emptyScannedQr: () => void
    isScannedQrRepeated: boolean
    setScannedQrRepeated: () => void

}

export const useQrStore = create<State>((set) => ({
    isQrScannerOpen: false,
    openQrScanner: () => set({ isQrScannerOpen: true }),
    closeQrScanner: () => set({ isQrScannerOpen: false }),
    scannedQr: [],
    setScannedQr: (qr) =>
        set((state) => ({
            scannedQr: Array.isArray(state.scannedQr) ? [...state.scannedQr, qr] : [qr],
        })),
    deleteScannedQr: (qr) =>
        set((state) => {
            if (Array.isArray(state.scannedQr)) {
                return {
                    scannedQr: state.scannedQr.filter((item) => item !== qr),
                };
            }
            return state;
        }),
    editScannedQr: (oldQr, newQr) =>
        set((state) => {
            if (Array.isArray(state.scannedQr)) {
                const updatedScannedQr = state.scannedQr.map((item) => {
                    if (item === oldQr) {
                        return newQr; // Update the edited QR code
                    }
                    return item;
                });
                return { scannedQr: updatedScannedQr };
            }
            return state;
        }),
    emptyScannedQr: () => set({ scannedQr: [] }),
    isScannedQrRepeated: false,
    setScannedQrRepeated: () => {
        set({ isScannedQrRepeated: true });
        setTimeout(() => {
            set({ isScannedQrRepeated: false });
        }, 4000); 
    },

}));