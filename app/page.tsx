import Header from '@/components/Header';
import CountryCard from '@/components/CountryCard';
import { countries } from '@/lib/countries';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-center text-gray-500 mb-8 text-sm">
          全 {countries.length} カ国を掲載
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
        </div>
      </main>
      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 東南アジア旅行ガイド — Built with Next.js 14
      </footer>
    </div>
  );
}
