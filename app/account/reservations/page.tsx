import type { Metadata } from 'next';
import ReservationCard from '@/app/components/ReservationCard';

export const metadata: Metadata = {
  title: 'Reservations',
};

// Define the shape of a booking (later you can move this to a shared types file, e.g. @/types/booking.ts)
export interface Booking {
  id: string | number;
  // Add properties here as you connect real booking data, e.g.:
  // startDate: string;
  // endDate: string;
  // numNights: number;
  // totalPrice: number;
}

export default function Page() {
  // CHANGE: Type the empty array so TypeScript knows what elements `bookings` will hold
  const bookings: Booking[] = [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">Your reservations</h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{' '}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
