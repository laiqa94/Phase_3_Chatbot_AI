import { NextResponse } from "next/server";

import { setSessionServer } from "@/lib/auth";

function baseUrl() {
  const url = process.env.API_BASE_URL;
  if (!url) throw new Error("API_BASE_URL is not set");
  return url;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const res = await fetch(`${baseUrl()}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(payload ?? { message: "Registration failed" }, { status: res.status });
  }

  // If backend returns session/token, persist it; otherwise just return response.
  if (payload && typeof payload === "object" && "accessToken" in payload) {
    await setSessionServer(payload as import("@/types/user").Session);
  }

  return NextResponse.json(payload);
}
