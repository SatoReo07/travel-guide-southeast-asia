import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: '東南アジア旅行ガイド',
  description: 'ASEAN10カ国の観光情報をまとめた旅行ガイド',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
