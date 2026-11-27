'use client';

import { isWithinInterval } from 'date-fns';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useReservation } from './ReservationContext';
import type { Cabin } from './Reservation';

interface Settings {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

type DateSelectorProps = {
  settings: Settings;
  cabin: Cabin;
  bookedDates: Date[];
};

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  if (!range?.from || !range?.to) return false;

  return datesArr.some((date) => isWithinInterval(date, { start: range.from!, end: range.to! }));
}

function DateSelector({ settings, cabin, bookedDates }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between overflow-x-auto">
      {/* Added the custom style block for the seamless tan design */}
      <style>{`
        .rdp-range_start,
        .rdp-range_middle,
        .rdp-range_end {
          background: #c89e64 !important;
        }
        .rdp-range_start .rdp-day_button,
        .rdp-range_middle .rdp-day_button,
        .rdp-range_end .rdp-day_button {
          background: transparent !important;
          color: #fff !important;
          border: none !important;
        }
        .rdp-range_start {
          border-top-left-radius: 100px !important;
          border-bottom-left-radius: 100px !important;
        }
        .rdp-range_end {
          border-top-right-radius: 100px !important;
          border-bottom-right-radius: 100px !important;
        }
      `}</style>

      <DayPicker
        className="pt-10 pb-6 px-4 place-self-center [&_.rdp-months]:!flex-nowrap [&_.rdp-months]:!flex-row [&_.rdp-months]:!gap-6"
        mode="range"
        onSelect={setRange}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
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
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>×</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
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
