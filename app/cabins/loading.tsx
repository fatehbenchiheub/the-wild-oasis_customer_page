import Spinner from '../components/Spinner';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-[50vh]">
      <Spinner />
      <p className="text-xl color-primary-200">Loading cabin data...</p>
    </div>
  );
}
