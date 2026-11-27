import { eachDayOfInterval } from 'date-fns';
import supabase from './supabase'; // Adjust path to match your project

// Domain models (move these to a shared types file later, e.g. @/types/wildOasis.ts)
export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description?: string;
}

export interface CabinPrice {
  regularPrice: number;
  discount: number;
}

export interface Guest {
  id: number;
  email: string;
  fullName?: string;
  nationality?: string | null;
  nationalID?: string | null;
  countryFlag?: string | null;
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

export interface BookingWithCabin extends Booking {
  cabins: Pick<Cabin, 'name' | 'image'> | null;
}

export interface Settings {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface Country {
  name: string;
  flag: string;
}

export type NewGuest = Omit<Guest, 'id'>;
export type NewBooking = Omit<Booking, 'id' | 'created_at'>;

/////////////
// GET

export async function getCabin(id: number): Promise<Cabin> {
  const { data, error } = await supabase.from('cabins').select('*').eq('id', id).single();

  if (error) {
    console.error(error);
  }

  return data as Cabin;
}

export async function getCabinPrice(id: number): Promise<CabinPrice | null> {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as CabinPrice;
}

export const getCabins = async function (): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return (data ?? []) as Cabin[];
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest | null> {
  const { data, error } = await supabase.from('guests').select('*').eq('email', email).single();

  // No error here! We handle the possibility of no guest in the sign in callback
  if (error) {
    return null;
  }

  return data as Guest;
}

export async function getBooking(id: number): Promise<Booking> {
  const { data, error } = await supabase.from('bookings').select('*').eq('id', id).single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data as Booking;
}

export async function getBookings(guestId: number): Promise<BookingWithCabin[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)',
    )
    .eq('guestId', guestId)
    .order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return (data ?? []) as unknown as BookingWithCabin[];
}

export async function getBookedDatesByCabinId(cabinId: number): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayIso = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${todayIso},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  const bookings = (data ?? []) as Booking[];

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = bookings
    .map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      }),
    )
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data as Settings;
}

export async function getCountries() {
  try {
    // Using a highly reliable, no-auth API hosted on Cloudflare
    const res = await fetch('https://countries-api.davegarvey.workers.dev/countries', {
      cache: 'no-store',
      // Add a timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 seconds
    });

    if (!res.ok) {
      throw new Error(`Countries request failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error(`Unexpected countries response: ${JSON.stringify(data)}`);
    }

    // Map the API's response to our expected { name, flag } structure
    return data.map((c: { name: string; flag: string }) => ({
      name: c.name ?? '',
      flag: c.flag ?? '',
    }));
  } catch (err) {
    console.error(err);
    // Throwing an error here allows Next.js to handle it gracefully
    throw new Error('Could not fetch countries');
  }
}
/////////////
// CREATE

export async function createGuest(newGuest: NewGuest): Promise<Guest[]> {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return (data ?? []) as Guest[];
}

export async function createBooking(newBooking: NewBooking): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data as Booking;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id: number, updatedFields: Partial<Guest>): Promise<Guest> {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data as Guest;
}

export async function updateBooking(id: number, updatedFields: Partial<Booking>): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data as Booking;
}

/////////////
// DELETE

export async function deleteBooking(id: number): Promise<void> {
  const { error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
}
