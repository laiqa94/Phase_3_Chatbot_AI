"use client";

export type TaskFilter = "all" | "pending" | "completed";

export function FilterTabs({
  value,
  onChange,
}: {
  value: TaskFilter;
  onChange?: (next: TaskFilter) => void;
}) {
  const items: Array<{ key: TaskFilter; label: string }> = [
    { key: "all", label: "All" },
    { key: "pending", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-1">
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          onClick={() => onChange?.(it.key)}
          className={
            it.key === value
              ? "rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white"
              : "rounded-md px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
          }
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
