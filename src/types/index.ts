export interface Task {
  id: string;
  title: string;
  description?: string;
  isFinish: boolean;
}

export interface Entry {
  id: string;
  task: Task;
  startTime: Date;
  endTime: Date | null;
  duration: number;
  lastPauseTime: Date | null;
  createdAt: string;
}
