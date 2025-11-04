import { TimerControls } from "@/components/timer/TimerControls";
import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { TimerEntriesList } from "@/components/timer/TimerEntriesList";
import { TimerTaskSelector } from "@/components/timer/TimerTaskSelector";
import { useTasksStore } from "@/hooks/use-task";
import { useTimer } from "@/hooks/use-timer";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function TimeTracker() {
  const [task, setTask] = useState("");
  const {
    entries,
    currentDuration,
    isRunning,
    isPaused,
    startTimer,
    stopTimer,
    togglePause,
    resetTimer,
  } = useTimer();

  const { tasks } = useTasksStore();

  const handleStartTimer = () => {
    if (!task) {
      toast.error("No task selected", { description: "Please select a task" });
      return;
    }
    startTimer(task);
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
          task={task}
          setTask={setTask}
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
