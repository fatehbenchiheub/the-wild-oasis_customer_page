import { getCabin } from '@/app/lib/data-service';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';
import Image from 'next/image';

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

  const { name, maxCapacity, regularPrice, discount, image, description } = cabin;
  const finalPrice = discount > 0 ? regularPrice - discount : regularPrice;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-primary-900/35 border border-primary-800/80 rounded-2xl p-5 sm:p-8 mb-16 shadow-xl">
        {/* Image */}
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] lg:col-span-5 rounded-xl overflow-hidden border border-primary-800/60">
          <Image
            src={image}
            fill
            alt={`Cabin ${name}`}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>

        {/* Details */}
        <div className="lg:col-span-7 flex flex-col justify-between py-1">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                Luxury Retreat
              </span>

              <div className="flex items-baseline gap-2.5 bg-primary-950/80 border border-primary-800 px-3.5 py-1.5 rounded-full">
                {discount > 0 ? (
                  <>
                    <span className="text-lg font-bold text-accent-300">${finalPrice}</span>
                    <span className="text-sm line-through text-primary-400">${regularPrice}</span>
                    <span className="text-xs font-semibold text-accent-400">Save ${discount}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-accent-300">${regularPrice}</span>
                )}
                <span className="text-xs text-primary-400">/ night</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-accent-100 mb-5">
              Cabin {name}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-primary-300 mb-8">
              {description}
            </p>
          </div>

          <ul className="flex flex-col gap-3.5 border-t border-primary-800/80 pt-6">
            <li className="flex items-center gap-3 text-primary-200">
              <UsersIcon className="h-5 w-5 shrink-0 text-accent-400" />
              <span className="text-base sm:text-lg">
                For up to <span className="font-semibold text-white">{maxCapacity}</span> guests
              </span>
            </li>
            <li className="flex items-center gap-3 text-primary-200">
              <MapPinIcon className="h-5 w-5 shrink-0 text-accent-400" />
              <span className="text-base sm:text-lg">
                Located in the heart of the{' '}
                <span className="font-semibold text-white">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex items-center gap-3 text-primary-200">
              <EyeSlashIcon className="h-5 w-5 shrink-0 text-accent-400" />
              <span className="text-base sm:text-lg">
                Privacy <span className="font-semibold text-white">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Booking CTA */}
      <div className="border-t border-primary-800/70 pt-10 text-center">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-accent-100">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </section>
  );
}
