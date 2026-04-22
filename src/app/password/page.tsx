export default async function PasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-ainomiq-navy px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-ainomiq-text">
            <span className="text-ainomiq-blue">ai</span>nomiq
          </h1>
          <p className="text-sm text-ainomiq-text-muted mt-2">
            Enter password to access this site
          </p>
        </div>

        <form action="/api/auth" method="POST" className="space-y-4">
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              autoFocus
              className="w-full rounded-lg border border-ainomiq-border bg-ainomiq-navy px-4 py-3 text-sm text-ainomiq-text placeholder:text-ainomiq-text-subtle focus:outline-none focus:ring-2 focus:ring-ainomiq-blue focus:border-transparent"
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
