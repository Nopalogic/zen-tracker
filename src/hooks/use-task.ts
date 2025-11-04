import { Task } from "@/types";
import { useCallback, useEffect, useState } from "react";

const TASKS_STORAGE_KEY = "time_tracker_tasks";

export const useTasksStore = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
    }
    return [];
  });

  console.log(tasks);
  
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, []);

  const editTask = useCallback((updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  }, []);

  const removeTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  return {
    tasks,
    addTask,
    editTask,
    removeTask,
  };
};
