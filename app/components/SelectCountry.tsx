import { getCountries, type Country } from '@/app/lib/data-service';
//import { auth } from '../lib/auth';

interface SelectCountryProps {
  defaultCountry: string | null | undefined;
  name: string;
  id: string;
  className?: string;
}

async function SelectCountry({ defaultCountry, name, id, className }: SelectCountryProps) {
  const rawCountries = await getCountries();
  //const session = await auth();

  const countries: Country[] = Array.isArray(rawCountries) ? rawCountries : [];

  const matchedCountry = countries.find(
    (country) => country.name.toLowerCase() === defaultCountry?.toLowerCase(),
  );
  const flag = matchedCountry?.flag ?? '';
  const selectedCountryName = matchedCountry?.name ?? defaultCountry;

  return (
    <select
      name={name}
      id={id}
      defaultValue={selectedCountryName ? `${selectedCountryName}%${flag}` : ''}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
