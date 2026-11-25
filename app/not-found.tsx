import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="text-sm font-semibold tracking-wider uppercase opacity-70">404</p>
      <h1 className="text-3xl font-semibold">This page could not be found.</h1>
      <p className="max-w-md text-base opacity-80">
        The link you followed may be broken, or the page may have been moved or removed.
      </p>
      <Link
        href="/"
        className="inline-block rounded-sm bg-accent-500 px-6 py-3 text-lg font-medium text-primary-800 transition-colors hover:bg-accent-600"
      >
        Go back home
      </Link>
    </main>
  );
}
