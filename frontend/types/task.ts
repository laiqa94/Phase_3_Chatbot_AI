export type TaskStatus = "pending" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  priority?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
  labels?: string[];
};
