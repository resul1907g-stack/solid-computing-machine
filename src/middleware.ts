import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/login", "/register", "/api/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Tenant resolution from subdomain
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  // In development, use query param or header for tenant
  const tenantSlug =
    request.headers.get("x-tenant-slug") ||
    request.nextUrl.searchParams.get("tenant") ||
    (subdomain !== "localhost" && subdomain !== "www" ? subdomain : null);

  if (tenantSlug) {
    const response = NextResponse.next();
    response.headers.set("x-tenant-slug", tenantSlug);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
