import { calculateDuration } from "@/lib/format";
import { Entry, Task } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  tasks: Task[];
  entries: Entry[];
  currentEntry: Entry | null;
  currentDuration: number;
  isRunning: boolean;
  isPaused: boolean;
}

interface AppActions {
  addTask: (taskData: Omit<Task, "id">) => void;
  editTask: (updatedTask: Task) => void;
  removeTask: (taskId: string) => void;
  startTimer: (taskId: string) => void;
  stopTimer: () => void;
  togglePause: () => void;
  resetTimer: () => void;
  updateCurrentDuration: () => void;
}

const initialState: AppState = {
  tasks: [],
  entries: [],
  currentEntry: null,
  currentDuration: 0,
  isRunning: false,
  isPaused: false,
};

const STORAGE_KEY = "time_tracker_store";

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
      },
      editTask: (updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          ),
        }));
      },
      removeTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },

      startTimer: (taskId) => {
        const { tasks } = get();
        const task = tasks.find((task) => task.id === taskId);
        if (!task) return;

        const newEntry: Entry = {
          id: crypto.randomUUID(),
          task: task,
          startTime: new Date(),
          endTime: null,
          duration: 0,
          lastPauseTime: null,
          createdAt: new Date().toISOString().split("T")[0],
        };
        set({
          currentEntry: newEntry,
          isRunning: true,
          isPaused: false,
          currentDuration: 0,
        });
      },
      stopTimer: () => {
        const { currentEntry } = get();
        if (!currentEntry) return;

        const endTime = new Date();
        const duration = calculateDuration(currentEntry.startTime, endTime);
        const completedEntry = { ...currentEntry, endTime, duration };

        set((state) => ({
          entries: [completedEntry, ...state.entries],
          currentEntry: null,
          isRunning: false,
          isPaused: false,
          currentDuration: 0,
        }));
      },
      togglePause: () => {
        const { currentEntry, isPaused } = get();
        if (!currentEntry) return;

        const now = new Date();
        const isNowPaused = !isPaused;

        if (isNowPaused) {
          set({
            currentEntry: { ...currentEntry, lastPauseTime: now },
            isPaused: true,
          });
        } else if (currentEntry.lastPauseTime) {
          const pauseDuration =
            now.getTime() - currentEntry.lastPauseTime.getTime();
          const newStartTime = new Date(
            currentEntry.startTime.getTime() + pauseDuration,
          );
          set({
            currentEntry: {
              ...currentEntry,
              startTime: newStartTime,
              lastPauseTime: null,
            },
            isPaused: false,
          });
        }
      },
      resetTimer: () => {
        const { currentEntry } = get();
        if (!currentEntry) return;

        set({
          currentEntry: {
            ...currentEntry,
            startTime: new Date(),
            duration: 0,
            lastPauseTime: null,
          },
          currentDuration: 0,
          isPaused: false,
        });
      },
      updateCurrentDuration: () => {
        const { currentEntry, isRunning, isPaused } = get();
        if (currentEntry && isRunning && !isPaused) {
          set({
            currentDuration: calculateDuration(currentEntry.startTime, null),
          });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        tasks: state.tasks,
        entries: state.entries,
      }),
    },
  ),
);
