"use client";

import type { Task } from "@/types/task";

export function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: {
  task: Task;
  onToggleComplete?: (taskId: number | string, nextCompleted: boolean) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number | string) => void;
}) {
  const isCompleted = task.completed;

  return (
    <div className="glass-card rounded-xl p-4 sm:p-5 hover:scale-[1.02] transition-all duration-300 floating">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <input
              aria-label={isCompleted ? "Mark task as incomplete" : "Mark task as complete"}
              type="checkbox"
              checked={isCompleted || false}
              onChange={() => onToggleComplete?.(task.id, !isCompleted)}
              className="h-5 w-5 flex-shrink-0 rounded border-2 border-white/30 bg-white/20 text-white focus:ring-2 focus:ring-white/50"
            />
            <h3 className={`font-semibold text-sm sm:text-base break-words ${isCompleted ? "line-through text-white/60" : "text-white"}`}>
              {task.title}
            </h3>
          </div>

          {task.description ? (
            <p className="mt-3 text-xs sm:text-sm text-white/80 break-words leading-relaxed">{task.description}</p>
          ) : null}
          
          {/* Priority and Due Date */}
          <div className="mt-3 flex flex-wrap gap-2">
            {task.priority && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-500/30 text-red-100 border border-red-400/50' :
                task.priority === 'medium' ? 'bg-yellow-500/30 text-yellow-100 border border-yellow-400/50' :
                'bg-green-500/30 text-green-100 border border-green-400/50'
              }`}>
                {task.priority.toUpperCase()}
              </span>
            )}
            {task.dueDate && (
              <span className="px-3 py-1 rounded-full text-xs bg-white/20 text-white/90 border border-white/30">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col lg:flex-row items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => onEdit?.(task)}
            className="flex-1 sm:flex-none glass-button rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white font-medium"
          >
            ✏️ Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(task.id)}
            className="flex-1 sm:flex-none glass-button rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-200 font-medium hover:bg-red-500/30"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
