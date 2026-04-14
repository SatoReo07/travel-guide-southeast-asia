import Link from 'next/link';
import { Country } from '@/lib/countries';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/countries/${country.slug}`} className="block group">
      <div className="bg-white rounded-2xl shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-3 h-full">
        <div className="flex items-center gap-3">
          <span className="text-5xl" role="img" aria-label={`${country.name}の国旗`}>
            {country.flag}
          </span>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
            {country.name}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <span>🏛️</span>
          <span>首都：{country.capital}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">{country.description}</p>

        <span className="mt-auto text-xs text-emerald-600 font-medium group-hover:underline">
          詳しく見る →
        </span>
      </div>
    </Link>
  );
}
