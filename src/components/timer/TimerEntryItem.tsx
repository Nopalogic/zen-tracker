import { Entry } from "@/types";
import { Card, CardContent } from "../ui/card";
import { formatTime } from "@/lib/format";

export const TaskEntryItem = ({ entry }: { entry: Entry }) => (
  <Card className="p-0 transition-all hover:shadow-md">
    <CardContent className="flex w-full items-center justify-between p-3">
      <div>
        <h3 className="line-clamp-1 text-base font-medium">
          {entry.task.title || "Unknown task"}
        </h3>
        <h4 className="text-xs text-neutral-400">{entry.task.description}</h4>
      </div>
      <p className="line-clamp-1 text-lg font-medium">
        {formatTime(entry.duration)}
      </p>
    </CardContent>
  </Card>
);
