import { create } from "zustand";

type SnackbarControlStore = {
    isVisible: boolean;
    setVisible: (newIsVisible: SnackbarControlStore['isVisible']) => void;
};

export const useSnacbarControlStore = create<SnackbarControlStore>((set) => ({
    isVisible: false,
    setVisible: (isVisible) => set({ isVisible }),
}));