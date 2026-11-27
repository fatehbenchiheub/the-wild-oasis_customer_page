import Navigation from '@/app/components/Navigation';
import Logo from '@/app/components/Logo';
import { Suspense } from 'react';
import Spinner from './Spinner';

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Suspense fallback={<Spinner />}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
}

export default Header;
