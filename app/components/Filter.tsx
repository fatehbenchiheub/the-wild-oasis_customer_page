'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type FilterValue = 'all' | 'small' | 'medium' | 'large';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter: FilterValue) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>
        All Cabins
      </Button>
      <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>
        1&mdash;3 guests
      </Button>
      <Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter}>
        4&mdash;7 guests
      </Button>
      <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>
        7&mdash;8 guests
      </Button>
    </div>
  );
}

type ButtonProps = {
  filter: FilterValue;
  handleFilter: (filter: FilterValue) => void;
  activeFilter: string;
  children: string;
};

function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter ? 'bg-primary-700 text-primary-50' : ''}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
