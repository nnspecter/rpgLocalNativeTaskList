import { create } from "zustand";

interface TaskDialogStore {
  visible: boolean;
  open: () => void;
  close: () => void;
}

export const useTaskDialogStore = create<TaskDialogStore>((set) => ({
  visible: false,
  open: () => set({ visible: true }),
  close: () => set({ visible: false }),
}));
