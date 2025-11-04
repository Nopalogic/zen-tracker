import { useTasks } from "./TaskProvider";
import { TasksDeleteDialog } from "./dialogs/TasksDeleteDialog";
import { TasksMutateDialog } from "./dialogs/TasksMutateDialog";

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks();

  const handleClose = () => {
    setOpen(null);
    setTimeout(() => setCurrentRow(null), 500);
  };

  return (
    <>
      <TasksMutateDialog
        key="task-create"
        open={open === "create"}
        onOpenChange={(isOpen) => !isOpen && setOpen(null)}
      />

      {currentRow && (
        <>
          <TasksMutateDialog
            key={`task-update-${currentRow.id}`}
            open={open === "update"}
            onOpenChange={(isOpen) => !isOpen && handleClose()}
            currentRow={currentRow}
          />
          <TasksDeleteDialog
            key={`task-delete-${currentRow.id}`}
            open={open === "delete"}
            onOpenChange={(isOpen) => !isOpen && handleClose()}
            task={currentRow}
          />
        </>
      )}
    </>
  );
}
