import { getBookedDatesByCabinId, getSettings } from '../lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description?: string;
}

interface ReservationProps {
  cabin: Cabin;
}

async function Reservation({ cabin }: ReservationProps) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(Number(cabin.id)),
  ]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.75fr_1fr] border border-primary-800 mt-10">
      <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
