'use client';

interface Cabin {
  cabin: {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
    description?: string;
  };
}

function ReservationForm({ cabin }: Cabin) {
  // CHANGE
  const { maxCapacity } = cabin;

  return (
    <div className="flex flex-col justify-between bg-primary-900">
      <div className="bg-primary-800 text-primary-300 px-10 py-2.5 flex justify-between items-center">
        <p>Logged in as</p>

        {/* <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
      </div>

      <form className="bg-primary-900 py-8 px-10 text-base flex-1 flex flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="numGuests">How many guests?</label>
            <select
              name="numGuests"
              id="numGuests"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
            >
              <option value="" key="">
                Select number of guests...
              </option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="observations">Anything we should know about your stay?</label>
            <textarea
              name="observations"
              id="observations"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              placeholder="Any pets, allergies, special requirements, etc.?"
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-5 pt-2">
          <p className="text-primary-300 text-sm whitespace-nowrap">Start by selecting dates</p>

          <button className="bg-accent-500 px-6 py-3.5 text-primary-800 font-semibold whitespace-nowrap shrink-0 hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
