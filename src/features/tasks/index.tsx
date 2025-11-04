import { TasksProvider } from "@/components/tasks/TaskProvider";
import { TasksCard } from "@/components/tasks/TasksCard";
import { TasksCreateButton } from "@/components/tasks/TasksButton";
import { TasksDialogs } from "@/components/tasks/TasksDialog";
import { useAppStore } from "@/stores/app-store";

export default function Tasks() {
  const { tasks } = useAppStore();
  const sortedTasks = [...tasks].sort(
    (a, b) => Number(a.isFinish) - Number(b.isFinish),
  );

  return (
    <TasksProvider>
      <div className="space-y-3 p-4">
        <TasksCreateButton />
        {tasks.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedTasks.map((item) => (
              <TasksCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center p-10 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You don&apos;t have any tasks.
            </h3>
            <p className="text-muted-foreground mt-2 max-w-sm">
              There are no tasks for you. If you want to create new tasks, just
              click{" "}
              <span className="bg-muted-foreground/15 text-primary rounded-sm px-1.5 py-0.5 font-medium">
                Create +
              </span>{" "}
              button to get started.
            </p>
          </div>
        )}
      </div>
      <TasksDialogs />
    </TasksProvider>
  );
}
