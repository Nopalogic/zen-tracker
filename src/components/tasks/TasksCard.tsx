import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { useTasks } from "./TaskProvider";
import { useAppStore } from "@/stores/app-store";
import { cn } from "@/lib/utils";

export function TasksCard(task: Task) {
  const { setOpen, setCurrentRow } = useTasks();
  const { editTask } = useAppStore();

  return (
    <Card
      className={cn(
        "group py-3 transition-shadow duration-200 hover:shadow-md",
        {
          "opacity-50": task.isFinish,
        },
      )}
    >
      <CardContent className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-base leading-tight">
            {task.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!task.isFinish ? (
                <DropdownMenuItem
                  onClick={() => {
                    editTask({ ...task, isFinish: true });
                    setCurrentRow(task);
                  }}
                >
                  Mark as finish
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => {
                    editTask({ ...task, isFinish: false });
                    setCurrentRow(task);
                  }}
                >
                  Mark as unfinish
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => {
                  setOpen("update");
                  setCurrentRow(task);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpen("delete");
                  setCurrentRow(task);
                }}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-3">
          {task.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
