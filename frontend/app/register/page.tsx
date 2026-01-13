"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ToastHost";

type RegisterResponse = {
  accessToken?: string;
  expiresAt?: string;
  user?: { id: string; email: string; displayName?: string };
};

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, full_name: displayName.trim() || email.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Registration failed" }));
        // Provide more specific error message for duplicate email
        const errorMessage = errorData.detail || errorData.message || "Registration failed";
        throw new Error(errorMessage);
      }

      const data = await response.json(); // Process the response which should set the cookie

      // If backend returns token, the /api/auth/register route handler will set cookies.
      if (data.accessToken) {
        toast.success("Account created.");
        router.replace("/dashboard");
      } else {
        toast.success("Account created. Please sign in.");
        router.replace("/login");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Create account</h1>
      <p className="mt-1 text-sm text-zinc-600">Start tracking your tasks.</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm font-medium text-zinc-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 rounded-md border border-zinc-200 px-3"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-zinc-700">Display name</span>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="h-10 rounded-md border border-zinc-200 px-3"
            autoComplete="nickname"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-zinc-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 rounded-md border border-zinc-200 px-3"
            autoComplete="new-password"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 h-10 rounded-md bg-zinc-900 px-4 text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {submitting ? "Creating…" : "Create account"}
        </button>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>

      <p className="mt-6 text-sm text-zinc-600">
        Already have an account?{" "}
        <Link className="text-zinc-900 underline" href="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}
