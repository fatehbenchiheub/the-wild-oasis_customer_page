import type { Metadata } from 'next';
import CabinList from '../components/CabinList';
import { Suspense } from 'react';
import Spinner from '../components/Spinner';
import Filter from '../components/Filter';

//export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Cabins',
};

type CabinsParams = {
  searchParams: Promise<{
    capacity: string;
  }>;
};

// Define the shape of a cabin (later move to a shared types file, e.g. @/types/cabin.ts)
/* export interface Cabin {
  // id: string | number;
  // Add fields as you connect data, e.g.:
  // name: string;
  // maxCapacity: number;
  // regularPrice: number;
  // discount: number;
  // image: string;
} */

export default async function Page({ searchParams }: CabinsParams) {
  const { capacity } = await searchParams;

  const filter = capacity ?? 'all';

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">Our Luxury Cabins</h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine
        waking up to beautiful mountain views, spending your days exploring the dark forests around,
        or just relaxing in your private hot tub under the stars. Enjoy nature&apos;s beauty in your
        own little home away from home. The perfect spot for a peaceful, calm vacation. Welcome to
        paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
