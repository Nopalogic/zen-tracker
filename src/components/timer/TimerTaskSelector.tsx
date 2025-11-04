import { Task } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const TimerTaskSelector = ({
  data,
  task,
  setTask,
  disabled,
}: {
  data: Task[];
  task: string;
  setTask: (t: string) => void;
  disabled: boolean;
}) => (
  <Select value={task} onValueChange={setTask} disabled={disabled}>
    <SelectTrigger className="hover:bg-accent w-44 border-none shadow-none">
      <span className="text-neutral-400">Task:</span>
      <SelectValue placeholder="Select a task" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {data.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.title}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
