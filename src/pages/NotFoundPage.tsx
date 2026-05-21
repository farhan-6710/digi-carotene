import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">404</h1>
        <p className="mt-1 text-muted-foreground">That route does not exist.</p>
      </div>
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95"
        >
          Go to dashboard
        </Link>
      </div>
    </section>
  );
}
