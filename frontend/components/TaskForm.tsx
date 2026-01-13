"use client";

import { useMemo, useState } from "react";

import type { Task } from "@/types/task";

type TaskDraft = Pick<Task, "title" | "description" | "dueDate" | "priority">;

export function TaskForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}: {
  mode: "create" | "edit";
  initialValues?: TaskDraft;
  onSubmit?: (draft: TaskDraft) => Promise<void> | void;
  onCancel?: () => void;
}) {
  const initial = useMemo<TaskDraft>(
    () => ({
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      dueDate: initialValues?.dueDate ?? "",
      priority: initialValues?.priority ?? "",
    }),
    [initialValues],
  );

  const [draft, setDraft] = useState<TaskDraft>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!draft.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit?.({
        title: draft.title.trim(),
        description: draft.description?.trim() || undefined,
        dueDate: draft.dueDate || undefined,
        priority: draft.priority || undefined,
      });
      if (mode === "create") setDraft({ title: "", description: "", dueDate: "", priority: "" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm font-medium text-zinc-700">Title</span>
          <input
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            className="h-10 rounded-md border border-zinc-200 px-3"
            placeholder="e.g., Pay rent"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-zinc-700">Due date</span>
          <input
            type="date"
            value={draft.dueDate ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, dueDate: e.target.value }))}
            className="h-10 rounded-md border border-zinc-200 px-3"
          />
        </label>

        <label className="grid gap-1 sm:col-span-2">
          <span className="text-sm font-medium text-zinc-700">Description</span>
          <textarea
            value={draft.description ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
            className="min-h-24 rounded-md border border-zinc-200 px-3 py-2"
            placeholder="Optional details"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-zinc-700">Priority</span>
          <input
            value={draft.priority ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value }))}
            className="h-10 rounded-md border border-zinc-200 px-3"
            placeholder="Optional"
          />
        </label>

        <div className="flex items-end justify-end gap-2">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="h-10 rounded-md border border-zinc-200 px-4 text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </button>
          ) : null}
          <button
            disabled={submitting}
            type="submit"
            className="h-10 rounded-md bg-zinc-900 px-4 text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {mode === "create" ? "Add task" : "Save"}
          </button>
        </div>
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
