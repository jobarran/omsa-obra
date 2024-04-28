import { create } from "zustand";


interface State {
    isQrScannerOpen: boolean
    openQrScanner: () => void
    closeQrScanner: () => void
}

export const useQrStore = create<State>((set) => ({
    isQrScannerOpen: false,
    openQrScanner: () => set({ isQrScannerOpen: true }),
    closeQrScanner: () => set({ isQrScannerOpen: false }),
}));