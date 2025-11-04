import { TimerControls } from "@/components/timer/TimerControls";
import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { TimerEntriesList } from "@/components/timer/TimerEntriesList";
import { TimerTaskSelector } from "@/components/timer/TimerTaskSelector";
import { useTimerInterval } from "@/hooks/use-timer";
import { useAppStore } from "@/stores/app-store";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function TimeTracker() {
  useTimerInterval();
  const {
    entries,
    isRunning,
    isPaused,
    currentDuration,
    startTimer,
    stopTimer,
    togglePause,
    resetTimer,
  } = useAppStore();

  const tasks = useAppStore((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState<string>("");

  const handleStartTimer = () => {
    if (!selectedTask) {
      toast.error("No task selected", { description: "Please select a task" });
      return;
    }
    startTimer(selectedTask);
  };

  const totalDurationToday = useMemo(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    return entries
      .filter(({ createdAt }) => createdAt === todayStr)
      .reduce((acc, res) => res.duration + acc, 0);
  }, [entries]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col items-center gap-3">
        <TimerTaskSelector
          data={tasks}
          task={selectedTask}
          setTask={setSelectedTask}
          disabled={isRunning || isPaused}
        />
        <TimerDisplay
          duration={currentDuration}
          totalToday={totalDurationToday}
        />
        <TimerControls
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={handleStartTimer}
          onStop={stopTimer}
          onPause={togglePause}
          onReset={resetTimer}
        />
        <TimerEntriesList entries={entries} className="mt-6" />
      </div>
    </div>
  );
}
