import { Task } from "@/types";
import React, { useState } from "react";

type TasksDialogType = "create" | "update" | "delete";

type TasksContextType = {
  open: TasksDialogType | null;
  setOpen: (str: TasksDialogType | null) => void;
  currentRow: Task | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>;
};

const TasksContext = React.createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<TasksDialogType | null>(null);
  const [currentRow, setCurrentRow] = useState<Task | null>(null);

  return (
    <TasksContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </TasksContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const tasksContext = React.useContext(TasksContext);

  if (!tasksContext) {
    throw new Error("useTasks has to be used within <TasksProvider>");
  }

  return tasksContext;
};
