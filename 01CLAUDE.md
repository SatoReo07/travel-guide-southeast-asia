# 東南アジア旅行ガイド — プロジェクト仕様

## 概要

東南アジア10カ国の観光情報を一覧・詳細で閲覧できる Next.js 製 Web アプリ。
国一覧ページと国詳細ページの2画面構成。データは PostgreSQL で管理する。

## 技術スタック

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- pg (node-postgres)

## 必須設定

### next.config.mjs

```js
const nextConfig = {
  output: 'standalone',
  experimental: { instrumentationHook: true },
};
export default nextConfig;
```

### DB ページ先頭

```ts
export const dynamic = 'force-dynamic';
```

## ディレクトリ構成

```
/
├── app/
│   ├── page.tsx              # 国一覧
│   └── countries/[slug]/
│       └── page.tsx          # 国詳細
├── components/
│   ├── Header.tsx
│   └── CountryCard.tsx
├── lib/
│   ├── countries.ts          # 型定義 + シードデータ
│   └── db.ts                 # DB 接続・クエリ
├── instrumentation.ts        # 起動時 DB 初期化
└── next.config.mjs
```

## DB スキーマ

```sql
CREATE TABLE IF NOT EXISTS countries (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  capital     TEXT NOT NULL,
  flag        TEXT NOT NULL,
  description TEXT NOT NULL,
  spots       JSONB NOT NULL,
  best_season TEXT NOT NULL
);
```

## DB 接続仕様

- Pool シングルトン（`global._pgPool`）で HMR による重複生成を防ぐ
- 環境変数：`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `DB_SSL=true` のとき `{ rejectUnauthorized: false }`
- デフォルト値：localhost:5432 / travel_guide / postgres / postgres

## 型定義

```ts
export interface Spot {
  name: string;
  description: string;
}

export interface Country {
  slug: string;
  name: string;
  capital: string;
  flag: string;
  description: string;
  spots: Spot[];
  bestSeason: string;
}
```

## シードデータ（10カ国）

| slug | 国名 | 首都 | 国旗 |
|------|------|------|------|
| thailand | タイ | バンコク | 🇹🇭 |
| vietnam | ベトナム | ハノイ | 🇻🇳 |
| singapore | シンガポール | シンガポール | 🇸🇬 |
| malaysia | マレーシア | クアラルンプール | 🇲🇾 |
| indonesia | インドネシア | ジャカルタ | 🇮🇩 |
| philippines | フィリピン | マニラ | 🇵🇭 |
| cambodia | カンボジア | プノンペン | 🇰🇭 |
| myanmar | ミャンマー | ネピドー | 🇲🇲 |
| laos | ラオス | ビエンチャン | 🇱🇦 |
| brunei | ブルネイ | バンダルスリブガワン | 🇧🇳 |

各国に spots（おすすめスポット3件）と bestSeason を含める。

## UI デザイン

- ヘッダー：`bg-gradient-to-r from-emerald-600 to-teal-500` + 白文字
- カード：白背景・角丸・影、ホバーで影が強くなる
- グリッド：`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- アクセントカラー：emerald / teal 系

## 規約

- `async/await` を使用（`.then()` は使わない）
- DB クエリは `lib/db.ts` に集約する
- コンポーネントは `components/` に配置する
