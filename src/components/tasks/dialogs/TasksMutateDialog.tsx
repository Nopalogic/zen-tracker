import { Button } from "@/components/ui/button";
import { Task } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/stores/app-store";

export function TasksMutateDialog({
  open,
  onOpenChange,
  currentRow,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: Task;
}) {
  const { addTask, editTask } = useAppStore();
  const isUpdate = !!currentRow;
  
  const [task, setTask] = useState(
    currentRow ?? {
      id: "",
      title: "",
      description: "",
      isFinish: false,
    },
  );

  const handleSubmit = (data: Task) => {
    if (!data.title) {
      toast.error("Title is required");
      return;
    }

    if (isUpdate) {
      editTask(data);
    } else {
      addTask(data);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Update" : "Create"} Task</DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update the task by providing necessary info. "
              : "Add a new task by providing necessary info. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Label htmlFor="title-1" className="text-right">
            Title
          </Label>
          <Input
            id="title-1"
            name="title"
            value={task.title}
            className="col-span-3"
            onChange={(event) =>
              setTask((prevState) => ({
                ...prevState,
                title: event.target.value,
              }))
            }
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description-1" className="text-right">
            Description
          </Label>
          <Textarea
            id="description-1"
            name="description"
            className="col-span-3"
            value={task.description}
            onChange={(event) =>
              setTask((prevState) => ({
                ...prevState,
                description: event.target.value,
              }))
            }
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={() => handleSubmit(task)}>
            Save{isUpdate && " changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
