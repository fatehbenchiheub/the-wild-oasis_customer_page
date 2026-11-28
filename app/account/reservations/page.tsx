import ReservationCard from '@/app/components/ReservationCard';
import { auth } from '@/app/lib/auth';
import { getBookings } from '@/app/lib/data-service';
import Link from 'next/link';

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description?: string;
}

export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  status?: string;
}

/*export interface ReservationItem extends Booking {
  cabins: Pick<Cabin, 'name' | 'image'>;
}*/

export default async function Page() {
  // const bookings: ReservationItem[] = [];
  const session = await auth();
  const bookings = await getBookings(Number(session?.user?.guestId));

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">Your reservations</h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{' '}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins →
          </Link>
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
