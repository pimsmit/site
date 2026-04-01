import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const isAuthenticated =
    request.cookies.get("site-auth")?.value === "authenticated";
  const isPasswordPage = request.nextUrl.pathname === "/password";

  // Allow password page, auth API, and static assets
  if (
    isPasswordPage ||
    request.nextUrl.pathname === "/api/auth" ||
    request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // Redirect to password page if not authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/password", request.url));
  }

  return NextResponse.next();
}
