import { create } from "zustand";
import QrScanner from 'qr-scanner';


interface State {

    isQrScannerOpen: boolean;
    openQrScanner: () => void;
    closeQrScanner: () => void;
    scannedQr: string[] | null
    setScannedQr: (qr: string) => void,
    emptyScannedQr: () => void

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
    emptyScannedQr: () => set({ scannedQr: [] })
}));