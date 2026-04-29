import Header from '@/components/Header';
import CountryCard from '@/components/CountryCard';
import { getCountries } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const countriesList = await getCountries();

  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-center text-gray-500 mb-8 text-sm">
          全 {countriesList.length} カ国を掲載
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countriesList.map((country) => (
            <CountryCard key={country.slug} country={country} />
          ))}
        </div>
      </main>
      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 東南アジア旅行ガイド — Built with Next.js 14
      </footer>
    </div>
  );
}
