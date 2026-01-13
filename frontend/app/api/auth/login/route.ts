import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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

  const res = await fetch(`${baseUrl()}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(payload ?? { message: "Login failed" }, { status: res.status });
  }

  // Set the access token cookie
  const cookieStore = await cookies();
  if (payload.access_token) {
    cookieStore.set("access_token", payload.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60, // 30 minutes
    });
  }

  return NextResponse.json(payload);
}
