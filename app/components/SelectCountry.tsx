import { getCountries } from '@/app/lib/data-service';

interface Country {
  name: string;
  flag: string;
}

interface SelectCountryProps {
  defaultCountry: string;
  name: string;
  id: string;
  className?: string;
}

async function SelectCountry({ defaultCountry, name, id, className }: SelectCountryProps) {
  const rawCountries = await getCountries();
  const countries: Country[] = Array.isArray(rawCountries) ? rawCountries : [];

  const matchedCountry = countries.find(
    (country) => country.name.toLowerCase() === defaultCountry.toLowerCase(),
  );
  const flag = matchedCountry?.flag ?? '';
  const selectedCountryName = matchedCountry?.name ?? defaultCountry;

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
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
