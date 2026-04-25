import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddTask, EditTask, Task } from "../types/tasksStoreTypes";
import { getTodayDate } from "@/shared/config/DateFormatters/DateFormatter";

interface UserStore {
  tasks: Task[];
  lastResetDate: string | null;
  addTask: (task: AddTask) => void;
  deleteTask: (taskId: number) => void;
  editTask: (task: EditTask) => void;
  resetDaily: () => void;
}

export const useTasksStore = create<UserStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      lastResetDate: null,
      // Добавление таски
      addTask: (task) => {
        set((state) => {
          const lastId = state.tasks.length
            ? state.tasks[state.tasks.length - 1].taskId
            : 0;
          const newTask: Task = {
            ...task,
            taskId: lastId + 1,
            isComplete: false,
          };
          return { tasks: [...state.tasks, newTask] };
        });
      },
      // Редактирование
      editTask: (updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.taskId === updatedTask.taskId ? { ...t, ...updatedTask } : t
          ),
        }));
      },
      // Удаление
      deleteTask: (taskId: number) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.taskId !== taskId),
        }));
      },
      // Ежедневный ресет
      resetDaily: () => {
        const { lastResetDate } = get();
        const today = getTodayDate();

        if (lastResetDate !== today) {
          set((state) => ({
            tasks: state.tasks.map((t) => ({ ...t, isComplete: false })),
            lastResetDate: today,
          }));
        }
      },
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);