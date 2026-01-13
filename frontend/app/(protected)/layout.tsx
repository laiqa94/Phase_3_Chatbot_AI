import { redirect } from "next/navigation";

import { Navbar } from "@/components/Navbar";
import { getSessionServer } from "@/lib/auth";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionServer();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar user={session.user} />
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
