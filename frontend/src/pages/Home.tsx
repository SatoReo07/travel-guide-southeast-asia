import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import { fetchCountries } from '../lib/api';
import type { Country } from '../types';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchCountries(controller.signal)
      .then(setCountries)
      .catch((e: Error) => {
        if (e.name !== 'AbortError') setError('データの取得に失敗しました');
      });
    return () => controller.abort();
  }, []);

  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-center text-gray-500 mb-8 text-sm">
              全 {countries.length} カ国を掲載
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country) => (
                <CountryCard key={country.slug} country={country} />
              ))}
            </div>
          </>
        )}
      </main>
      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 東南アジア旅行ガイド — Built with React + Vite
      </footer>
    </div>
  );
}
