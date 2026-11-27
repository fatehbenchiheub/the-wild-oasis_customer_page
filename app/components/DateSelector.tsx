'use client';

import { useState } from 'react';
import { isSameDay, isWithinInterval } from 'date-fns';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import type { Cabin } from './Reservation';

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  if (!range?.from || !range?.to) return false;
  const start = range.from;
  const end = range.to;

  return datesArr.some((date) => isWithinInterval(date, { start, end }));
}

interface Settings {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

type DateSelectorProps = {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
};

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const { regularPrice, discount } = cabin;
  const numNights = 23;
  const cabinPrice = 23;
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const { minBookingLength, maxBookingLength } = settings;

  // const minBookingLength = settings?.minBookingLength ?? 1;
  //const maxBookingLength = settings?.maxBookingLength ?? 23;

  const resetRange = () => setRange(undefined);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  return (
    <div className="flex flex-col justify-between overflow-x-auto">
      <DayPicker
        className="pt-10 pb-6 px-4 place-self-center [&_.rdp-months]:!flex-nowrap [&_.rdp-months]:!flex-row [&_.rdp-months]:!gap-6"
        mode="range"
        selected={range}
        onSelect={(selectedRange) => {
          if (isAlreadyBooked(selectedRange, bookedDates)) {
            setRange(undefined);
          } else {
            setRange(selectedRange);
          }
        }}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        disabled={(date) =>
          date < startOfToday || bookedDates.some((bookedDate) => isSameDay(date, bookedDate))
        }
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-18 shrink-0">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline whitespace-nowrap">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">${regularPrice}</span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl whitespace-nowrap">
                <span>×</span> <span>{numNights}</span>
              </p>
              <p className="whitespace-nowrap">
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            type="button"
            className="border border-primary-800 py-2 px-4 text-sm font-semibold whitespace-nowrap"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
