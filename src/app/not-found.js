import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#ffffff_38%,_#f8fafc_100%)] px-4 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-[0_20px_50px_-28px_rgba(15,23,42,0.24)]">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">DriveFleet</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Oops! Page Not Found</h1>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
