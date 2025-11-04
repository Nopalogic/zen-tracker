import { calculateDuration } from "@/lib/format";
import { Entry } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useTasksStore } from "./use-task";

const TRACKER_STORAGE_KEY = "time_tracker_entries";

export const useTimer = () => {
  const [entries, setEntries] = useState<Entry[]>(() => {
    try {
      const saved = localStorage.getItem(TRACKER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((entry: Entry) => ({
          ...entry,
          startTime: new Date(entry.startTime),
          endTime: entry.endTime ? new Date(entry.endTime) : null,
          lastPauseTime: entry.lastPauseTime
            ? new Date(entry.lastPauseTime)
            : null,
        }));
      }
    } catch (error) {
      console.error("Failed to parse entries from localStorage", error);
    }
    return [];
  });

  const [currentEntry, setCurrentEntry] = useState<Entry | null>(null);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const { tasks } = useTasksStore();

  useEffect(() => {
    localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      if (currentEntry) {
        setCurrentDuration(calculateDuration(currentEntry.startTime, null));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, currentEntry]);

  const startTimer = useCallback((taskId: string) => {
    const newEntry: Entry = {
      id: crypto.randomUUID(),
      task: tasks.find((task) => task.id === taskId)!,
      startTime: new Date(),
      endTime: null,
      duration: 0,
      lastPauseTime: null,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCurrentEntry(newEntry);
    setIsRunning(true);
    setIsPaused(false);
    setCurrentDuration(0);
  }, [tasks]);

  const stopTimer = useCallback(() => {
    if (!currentEntry) return;

    const endTime = new Date();
    const duration = calculateDuration(currentEntry.startTime, endTime);
    const completedEntry = { ...currentEntry, endTime, duration };

    setEntries((prev) => [completedEntry, ...prev]);
    setCurrentEntry(null);
    setIsRunning(false);
    setIsPaused(false);
    setCurrentDuration(0);
  }, [currentEntry]);

  const togglePause = useCallback(() => {
    if (!currentEntry) return;

    const now = new Date();
    setIsPaused((paused) => {
      const isNowPaused = !paused;
      if (isNowPaused) {
        setCurrentEntry({ ...currentEntry, lastPauseTime: now });
      } else if (currentEntry.lastPauseTime) {
        const pauseDuration =
          now.getTime() - currentEntry.lastPauseTime.getTime();
        const newStartTime = new Date(
          currentEntry.startTime.getTime() + pauseDuration,
        );
        setCurrentEntry({
          ...currentEntry,
          startTime: newStartTime,
          lastPauseTime: null,
        });
      }
      return isNowPaused;
    });
  }, [currentEntry]);

  const resetTimer = useCallback(() => {
    if (!currentEntry) return;

    setCurrentEntry({
      ...currentEntry,
      startTime: new Date(),
      duration: 0,
      lastPauseTime: null,
    });
    setCurrentDuration(0);
    setIsPaused(false);
  }, [currentEntry]);

  return {
    entries,
    currentDuration,
    isRunning,
    isPaused,
    startTimer,
    stopTimer,
    togglePause,
    resetTimer,
  };
};
