import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useTasks } from "./TaskProvider";
import { Task } from "@/types";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useAppStore } from "@/stores/app-store";

export function TasksCreateButton() {
  const { setOpen } = useTasks();
  return (
    <Button className="w-full space-x-1" onClick={() => setOpen("create")}>
      <span>Create</span> <Plus size={18} />
    </Button>
  );
}

export function TasksFinishToggleMenuItem(task: Task) {
  const { editTask } = useAppStore();
  return (
    <>
      {!task.isFinish ? (
        <DropdownMenuItem
          onClick={() => {
            editTask({ ...task, isFinish: true });
          }}
        >
          Mark as finish
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem
          onClick={() => {
            editTask({ ...task, isFinish: false });
          }}
        >
          Unmark as finish
        </DropdownMenuItem>
      )}
    </>
  );
}
