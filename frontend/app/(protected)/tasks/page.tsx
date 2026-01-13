import { apiFetchServer } from "@/lib/apiServer";
import type { Task } from "@/types/task";

import { TasksClient } from "./tasksClient";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "all";
  const q = params.q ?? "";

  const qs = new URLSearchParams();
  if (status && status !== "all") qs.set("status", status);
  if (q) qs.set("q", q);

  const data = await apiFetchServer<{ items: Task[] }>(`/api/me/tasks?${qs.toString()}`, {
    method: "GET",
  });

  return <TasksClient initialTasks={data.items ?? []} initialStatus={status} initialQuery={q} />;
}
