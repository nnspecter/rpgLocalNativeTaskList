import { create } from "zustand";
import { SelectedTask } from "../types/timerStoreTypes";



interface TimerStore {
    isTimer: boolean;
    setIsTimer: (value: boolean) => void;
    selectedTask: SelectedTask;
    setSelectedTask: (taskId: number | null, taskName: string, minutes: number) => void;
};

export const useTimerStore = create<TimerStore>((set) => ({
    isTimer: false,
    setIsTimer: (value) => set({ isTimer: value }),

    selectedTask: {taskId: null, taskName: "", minutes: 0, },
    setSelectedTask: (taskId, taskName, minutes) =>
        set({
            selectedTask: {taskId, taskName, minutes },
        }),
}));