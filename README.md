# 東南アジア旅行ガイド

ASEAN 10カ国の観光情報を提供する Web アプリです。

## アーキテクチャ

```
ブラウザ
  │  HTTP :80
  ▼
frontend コンテナ（nginx）
  │  静的ファイル（HTML / JS / CSS）を配信
  │  ページ表示時に fetch でデータを取得
  │  HTTP :3001
  ▼
backend コンテナ（Express）
  │  REST API でJSON を返す
  ▼
countries.js（メモリ上の静的データ）
```

- **frontend** はビルド済みの静的ファイルを nginx が配信する。React Router でページ遷移はブラウザ側で処理する（SPA）。
- **backend** は Express の REST API サーバー。国データをメモリに保持し、リクエストに応じて JSON を返す。
- 2つのコンテナは `docker-compose.yml` で管理し、`docker compose up --build` 一発で両方起動できる。
- フロントエンドの API 接続先は `VITE_API_BASE` 環境変数で切り替え可能（デフォルト: `http://localhost:3001`）。

---

## 構成

```
travel-guide/
├── backend/                    # Express API サーバー
│   ├── data/
│   │   └── countries.js        # 国データ（10カ国）
│   ├── server.js               # GET /api/countries, /api/countries/:slug
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/                   # React + Vite フロントエンド
│   ├── src/
│   │   ├── App.tsx             # ルーティング定義
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   └── CountryCard.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx        # 国一覧ページ
│   │   │   └── CountryDetail.tsx  # 国詳細ページ
│   │   ├── lib/
│   │   │   └── api.ts          # fetch 共通化（AbortController 含む）
│   │   └── types/
│   │       └── index.ts        # Country / Spot 型定義
│   ├── nginx.conf              # SPA 用ルーティング設定
│   ├── Dockerfile              # ビルド → nginx で配信
│   └── .dockerignore
├── docker-compose.yml          # 2コンテナを管理
└── README.md
```

### ポート

| サービス | ポート | 説明 |
|---|---|---|
| frontend | 80 | React アプリ（nginx） |
| backend | 3001 | Express API |

### API エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/api/countries` | 全10カ国を取得 |
| GET | `/api/countries/:slug` | 1カ国の詳細を取得 |

---

## ローカル起動

### Docker で起動（推奨）

```bash
docker compose up --build
```

ブラウザで http://localhost を開く。

コンテナを止める：

```bash
docker compose down
```

### コンテナに入る

```bash
docker compose exec frontend sh
docker compose exec backend sh
```

### ローカル開発（Docker なし）

**バックエンド：**

```bash
cd backend
npm install
npm start
# → http://localhost:3001
```

**フロントエンド：**

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## AWS ECR へのプッシュ手順

```bash
# ログイン
aws ecr get-login-password --region <region> | \
  docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com

# ビルド & タグ付け
docker build -t travel-guide-backend ./backend
docker tag travel-guide-backend:latest \
  <account>.dkr.ecr.<region>.amazonaws.com/travel-guide-backend:latest

docker build -t travel-guide-frontend ./frontend
docker tag travel-guide-frontend:latest \
  <account>.dkr.ecr.<region>.amazonaws.com/travel-guide-frontend:latest

# プッシュ
docker push <account>.dkr.ecr.<region>.amazonaws.com/travel-guide-backend:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/travel-guide-frontend:latest
```
