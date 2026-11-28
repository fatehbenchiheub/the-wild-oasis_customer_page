'use server';

import { auth, signIn, signOut } from './auth';
// import { updateGuest as updateGuestDb } from '@/app/lib/data-service'; // Import your DB function
import { revalidatePath } from 'next/cache';
import supabase from './supabase';

export async function updateGuest(formData: FormData) {
  // 1. Authenticate the user
  const session = await auth();
  if (!session) throw new Error('You MUST be logged in');

  // 2. Get the data directly from formData and cast it as a string
  const nationalID = formData.get('nationalID') as string;
  const nationalityData = formData.get('nationality') as string;

  // 3. Safety check: Ensure the user actually selected a country
  if (!nationalityData || !nationalityData.includes('%')) {
    throw new Error('Invalid nationality selection');
  }

  // 4. Split the string. Now TypeScript knows it's a string, so no red squiggles!
  const [nationality, countryFlag] = nationalityData.split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provide a valid National ID');
  // 5. Create the object with ONLY the fields you want to update in the database
  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  // 6. Call your data-service to update Supabase

  //await updateGuestDb(Number(session.user.guestId), updateData);
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', Number(session.user.guestId))
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  // 7. Revalidate the cache so the new data shows up immediately
  revalidatePath('/account/profile');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
