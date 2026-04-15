import { NextRequest } from "next/server";

export function isAdminRequest(request: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  const received = request.headers.get("x-admin-key");

  if (!expected) {
    throw new Error("Missing ADMIN_PASSWORD");
  }

  return received === expected;
}

export function assertAdminRequest(request: NextRequest) {
  if (!isAdminRequest(request)) {
    throw new Error("Unauthorized");
  }
}
