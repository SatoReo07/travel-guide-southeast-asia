'use client';

import Header from '@/components/Header';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-500 text-sm">
          データベースへの接続に失敗しました。しばらく待ってから
          <button onClick={reset} className="text-emerald-600 hover:underline ml-1">
            再試行
          </button>
          してください。
        </p>
      </main>
      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 東南アジア旅行ガイド — Built with Next.js 14
      </footer>
    </div>
  );
}
