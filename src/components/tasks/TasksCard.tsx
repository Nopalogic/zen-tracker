import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, Trash2 } from "lucide-react";
import { useTasks } from "./TaskProvider";
import { Task } from "@/types";
import { Button } from "../ui/button";
import { TasksFinishToggleMenuItem } from "./TasksButton";
import { cn } from "@/lib/utils";

export function TasksCard(item: Task) {
  return (
    <Card
      className={cn({
        "border-green-600 bg-green-400/10": item.isFinish,
      })}
    >
      <CardContent>
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1">{item.title}</h3>
          <TasksCardActions {...item} />
        </div>
        <p className="line-clamp-1">{item.description}</p>
      </CardContent>
    </Card>
  );
}

function TasksCardActions(task: Task) {
  const { setOpen, setCurrentRow } = useTasks();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <TasksFinishToggleMenuItem {...task} />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(task);
            setOpen("update");
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(task);
            setOpen("delete");
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <Trash2 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
