'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRetry() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="max-w-md text-base opacity-80">
        We could not load this page right now. Please try again.
      </p>

      <button
        type="button"
        onClick={handleRetry}
        disabled={isPending}
        className="inline-block cursor-pointer rounded-sm bg-accent-500 px-6 py-3 text-lg font-medium text-primary-800 transition-colors hover:bg-accent-600 disabled:opacity-50"
      >
        {isPending ? 'Retrying...' : 'Try again'}
      </button>
    </main>
  );
}
