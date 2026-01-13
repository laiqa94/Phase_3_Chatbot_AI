import { NextResponse } from "next/server";

import { getSessionServer } from "@/lib/auth";

function baseUrl() {
  const url = process.env.API_BASE_URL;
  if (!url) throw new Error("API_BASE_URL is not set");
  return url;
}

async function handler(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const session = await getSessionServer();

  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const incomingUrl = new URL(req.url);

  // Transform frontend API paths to backend API paths
  let transformedPath = `/${path.join("/")}`;

  // Transform /api/me/tasks/{id}/complete to /api/v1/tasks/{id}/toggle (for completion toggle)
  if (transformedPath.includes('/api/me/tasks/') && transformedPath.includes('/complete')) {
    transformedPath = transformedPath.replace('/api/me/tasks/', '/api/v1/tasks/')
                                   .replace('/complete', '/toggle');
  }
  // Transform /api/me/tasks to /api/v1/tasks (replace 'me' with 'v1')
  else if (transformedPath.startsWith('/api/me/')) {
    transformedPath = transformedPath.replace('/api/me/', '/api/v1/');
  }
  // Transform /api/tasks to /api/v1/tasks (add v1 after api) - fallback
  else if (transformedPath.startsWith('/api/tasks')) {
    transformedPath = transformedPath.replace('/api/tasks', '/api/v1/tasks');
  }
  // Transform /api/auth to /api/v1/auth (add v1 after api)
  else if (transformedPath.startsWith('/api/auth')) {
    transformedPath = transformedPath.replace('/api/auth', '/api/v1/auth');
  }

  const targetPath = `${transformedPath}${incomingUrl.search}`;

  const res = await fetch(`${baseUrl()}${targetPath}`, {
    method: req.method,
    headers: {
      Accept: req.headers.get("accept") ?? "application/json",
      "Content-Type": req.headers.get("content-type") ?? "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: req.method === "GET" || req.method === "HEAD" ? undefined : await req.text(),
  });

  // Handle redirect responses properly
  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get("location");
    if (location) {
      return NextResponse.redirect(location, { status: res.status });
    }
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const json = await res.json().catch(() => null);
    return NextResponse.json(json, { status: res.status });
  }

  const text = await res.text();
  return new NextResponse(text, { status: res.status, headers: { "content-type": contentType } });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
