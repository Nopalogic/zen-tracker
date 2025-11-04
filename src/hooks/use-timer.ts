import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export const useTimerInterval = () => {
  const { isRunning, isPaused, updateCurrentDuration } = useAppStore();

  useEffect(() => {
    if (!isRunning || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      updateCurrentDuration();
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, updateCurrentDuration]);
};
