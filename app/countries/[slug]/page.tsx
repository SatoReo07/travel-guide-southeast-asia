import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { countries, getCountryBySlug as getCountryBySlugFallback } from '@/lib/countries';
import { getCountryBySlug } from '@/lib/db';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let country;
  try {
    country = await getCountryBySlug(params.slug);
  } catch {
    country = getCountryBySlugFallback(params.slug);
  }
  if (!country) return {};
  return {
    title: `${country.flag} ${country.name} — 東南アジア旅行ガイド`,
    description: country.description,
  };
}

export default async function CountryDetailPage({ params }: Props) {
  let country;
  try {
    country = await getCountryBySlug(params.slug);
  } catch (err) {
    console.error('[DB] getCountryBySlug failed, using fallback:', err);
    country = getCountryBySlugFallback(params.slug);
  }
  if (!country) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-emerald-100 hover:text-white text-sm mb-4 transition-colors"
          >
            ← 一覧に戻る
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-6xl" role="img" aria-label={`${country.name}の国旗`}>
              {country.flag}
            </span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{country.name}</h1>
              <p className="text-emerald-100 mt-1 flex items-center gap-1.5">
                <span>🏛️</span> 首都：{country.capital}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
        {/* 紹介文 */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-700 leading-relaxed">{country.description}</p>
        </section>

        {/* ベストシーズン */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">
            <span>🗓️</span> ベストシーズン
          </h2>
          <p className="text-amber-900 font-medium">{country.bestSeason}</p>
        </section>

        {/* おすすめスポット */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📍</span> おすすめスポット
          </h2>
          <ol className="flex flex-col gap-4">
            {country.spots.map((spot, index) => (
              <li key={spot.name} className="bg-white rounded-2xl shadow-sm p-5 flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{spot.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{spot.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 東南アジア旅行ガイド — Built with Next.js 14
      </footer>
    </div>
  );
}
