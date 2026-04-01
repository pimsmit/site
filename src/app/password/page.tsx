import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function authenticate(formData: FormData) {
  "use server";

  const password = formData.get("password") as string;
  const expected = process.env.SITE_PASSWORD || "XrpBtc2002!";

  if (password === expected) {
    const cookieStore = await cookies();
    cookieStore.set("site-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    redirect("/");
  }

  redirect("/password?error=1");
}

export default async function PasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-ainomiq-text">
            <span className="text-ainomiq-blue">ai</span>nomiq
          </h1>
          <p className="text-sm text-ainomiq-text-muted mt-2">
            Enter password to access this site
          </p>
        </div>

        <form action={authenticate} className="space-y-4">
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              autoFocus
              className="w-full rounded-lg border border-ainomiq-border bg-white px-4 py-3 text-sm text-ainomiq-text placeholder:text-ainomiq-text-subtle focus:outline-none focus:ring-2 focus:ring-ainomiq-blue focus:border-transparent"
            />
          </div>
          {params.error && (
            <p className="text-sm text-red-500">Incorrect password</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white font-medium py-3 text-sm transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
