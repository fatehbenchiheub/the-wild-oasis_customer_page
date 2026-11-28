import Image from 'next/image';
import React, { Suspense } from 'react';
import { updateGuest } from '../lib/actions';

interface ProfileFormSelectCountry {
  children: React.ReactNode;
  guest: {
    id: number;
    email: string;
    fullName?: string;
    nationality?: string | null;
    nationalID?: string | null;
    countryFlag?: string | null;
  } | null;
}

function UpdateProfileForm({ children, guest }: ProfileFormSelectCountry) {
  if (!guest) return null;
  const { fullName, email, nationality, nationalID, countryFlag } = guest;
  // const countryFlag = '/pt.jpg';
  return (
    <form action={updateGuest} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <div className="space-y-2">
        <label>Full name</label>
        <input
          defaultValue={fullName}
          name="fullName"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          defaultValue={email}
          name="email"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="relative h-5 w-8 overflow-hidden rounded-sm">
            {countryFlag && (
              <Image src={countryFlag} fill alt="Country flag" className="object-cover" />
            )}
          </div>
        </div>
        <Suspense
          fallback={
            <select
              disabled
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              defaultValue={nationality ? nationality : ''}
            >
              <option>Loading countries...</option>
            </select>
          }
        >
          {children}
        </Suspense>
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID ? nationalID : ''}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
          Update profile
        </button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
