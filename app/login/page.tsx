import { Metadata } from 'next';
import SignInButton from '../components/SignInButton';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <section className="fixed inset-0 flex items-center justify-center overflow-hidden bg-neutral-50 px-4 dark:bg-neutral-950">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Sign in with Google to access your guest area.
        </p>

        <div className="mt-6">
          <SignInButton />
        </div>
      </div>
    </section>
  );
}
