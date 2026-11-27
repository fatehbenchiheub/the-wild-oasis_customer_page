import Image from 'next/image';
import { signInAction } from '../lib/actions';

function SignInButton() {
  return (
    <form action={signInAction}>
      <button
        type="submit"
        className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-800 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 hover:shadow-sm active:translate-y-0 active:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-600 dark:hover:bg-neutral-800/80 dark:active:bg-neutral-800 dark:focus-visible:outline-neutral-100"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={20}
          width={20}
          className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
