"use client";

import Link from "next/link";

import type { User } from "@/types/user";

export function Navbar({ user }: { user?: User }) {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    window.location.assign("/login");
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/dashboard" className="font-semibold text-zinc-900">
          Todo
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/tasks" className="text-zinc-700 hover:text-zinc-900">
            Tasks
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-zinc-700 sm:inline">
                {user.displayName ?? user.email}
              </span>
              <button
                type="button"
                onClick={() => void logout()}
                className="rounded-md border border-zinc-200 px-3 py-1.5 text-zinc-700 hover:bg-zinc-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md border border-zinc-200 px-3 py-1.5 text-zinc-700 hover:bg-zinc-50"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
