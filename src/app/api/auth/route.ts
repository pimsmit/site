import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = ((formData.get("password") as string) || "").trim();
  const expected = (process.env.SITE_PASSWORD || "XrpBtc2002!").trim();

  if (password === expected) {
    const cookieStore = await cookies();
    cookieStore.set("site-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return NextResponse.redirect(new URL("/", request.url), 303);
  }

  return NextResponse.redirect(
    new URL("/password?error=1", request.url),
    303
  );
}
