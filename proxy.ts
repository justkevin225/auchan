import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Routes protégées (app/(protected)/)
const PROTECTED_PATHS = [
  "/dashboard",
  "/stores",
  "/transactions",
  "/clients",
  "/management",
  "/statistics",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_PATHS.some((path) =>
    pathname === path || pathname.startsWith(path + "/"),
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("auth")?.value;

  if (authCookie === "true") {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/stores",
    "/stores/:path*",
    "/transactions",
    "/transactions/:path*",
    "/clients",
    "/clients/:path*",
    "/management",
    "/management/:path*",
    "/statistics",
    "/statistics/:path*",
  ],
};
