import { formatDate, formatTime } from "@/lib/format";
import { Fragment, useMemo } from "react";
import { TaskEntryItem } from "./TimerEntryItem";
import { Entry } from "@/types";
import { cn } from "@/lib/utils";

export function TimerEntriesList({
  entries,
  className,
}: {
  entries: Entry[];
  className?: string;
}) {
  const entriesByDay = useMemo(
    () => Object.groupBy(entries, ({ createdAt }) => createdAt),
    [entries],
  );

  return (
    <div
      className={cn(
        "scrollbar-hidden max-h-60 w-full space-y-4 overflow-y-scroll",
        className,
      )}
    >
      {Object.entries(entriesByDay).map(([day, dayEntries]) => (
        <Fragment key={day}>
          <div className="bg-background sticky top-0 flex items-center justify-between border-b pb-1">
            <h4 className="font-semibold">{formatDate(day)}</h4>
            <p className="space-x-1 text-neutral-300">
              <span>Total:</span>
              <span className="font-semibold text-neutral-600">
                {formatTime(
                  dayEntries?.reduce(
                    (acc, { duration }) => duration + acc,
                    0,
                  ) || 0,
                )}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            {dayEntries?.map((entry) => (
              <TaskEntryItem key={entry.id} entry={entry} />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
