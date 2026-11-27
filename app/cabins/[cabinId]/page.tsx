import CabinDetails from '@/app/components/CabinDetails';
import Reservation from '@/app/components/Reservation';
import Spinner from '@/app/components/Spinner';
import { getCabin, getCabins } from '@/app/lib/data-service';
import { Metadata } from 'next';
import { Suspense } from 'react';

type CabinIdParams = {
  params: Promise<{
    cabinId: string;
  }>;
};

export async function generateMetadata({ params }: CabinIdParams): Promise<Metadata> {
  const { cabinId } = await params;

  const { name } = await getCabin(Number(cabinId));

  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }: CabinIdParams) {
  const { cabinId } = await params;
  const cabin = await getCabin(Number(cabinId));

  if (!cabin) {
    return (
      <div className="max-w-4xl mx-auto my-20 px-6 text-center">
        <p className="text-xl text-primary-300">Cabin not found.</p>
      </div>
    );
  }

  const { name } = cabin;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <CabinDetails cabin={cabin} />
      <div className="border-t border-primary-800/70 pt-10">
        <h2 className="text-center text-3xl sm:text-5xl font-semibold tracking-tight text-accent-100">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </section>
  );
}
