import { Task } from "@/entities/tasks";
import { create } from "zustand";

interface TaskDialogStore {
  newTaskBottomSheetVisible: boolean;
  openNewTaskBottomSheet: () => void;
  closeNewTaskBottomSheet: () => void;
  changeTaskBottomSheet: {visible: boolean, task: Task | null};
  openChangeTaskBottomSheet: (task: Task) => void;
  closeChangeTaskBottomSheet: () => void; 
}

export const useTaskBottomSheetsStore = create<TaskDialogStore>((set) => ({
  //NewTaskBottomSheet.tsx
  newTaskBottomSheetVisible: false,
  openNewTaskBottomSheet: () => set({ newTaskBottomSheetVisible: true, changeTaskBottomSheet: {visible: false, task: null} }),
  closeNewTaskBottomSheet: () => set({ newTaskBottomSheetVisible: false}),
  
  //ChangeTaskBottomSheet.tsx
  changeTaskBottomSheet: {visible: false, task: null},
  openChangeTaskBottomSheet: (task: Task) => set({ newTaskBottomSheetVisible: false, changeTaskBottomSheet: {visible: true, task: task} }),
  closeChangeTaskBottomSheet: () => set({ changeTaskBottomSheet: {visible: false, task: null} }), 
}));
