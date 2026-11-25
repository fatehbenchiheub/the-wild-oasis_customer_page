import type { Metadata } from 'next';
import CabinCard from '@/app/components/CabinCard';
import { getCabins } from '../lib/data-service';
import CabinList from '../components/CabinList';
import { Suspense } from 'react';
import Spinner from '../components/Spinner';

export const metadata: Metadata = {
  title: 'Cabins',
};

// Define the shape of a cabin (later move to a shared types file, e.g. @/types/cabin.ts)
export interface Cabin {
  id: string | number;
  // Add fields as you connect data, e.g.:
  // name: string;
  // maxCapacity: number;
  // regularPrice: number;
  // discount: number;
  // image: string;
}

export default async function Page() {
  // CHANGE: Annotate empty array so TypeScript knows its element type instead of `never[]`
  //const cabins: Cabin[] = [];

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
      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
