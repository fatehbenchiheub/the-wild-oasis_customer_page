// ReservationContext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import type { DateRange } from 'react-day-picker';

type ReservationContextValue = {
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextValue | undefined>(undefined);

const initialState: DateRange = { from: undefined, to: undefined };

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) throw new Error('Context was used outside provider');
  return context;
}

export { ReservationProvider, useReservation };
