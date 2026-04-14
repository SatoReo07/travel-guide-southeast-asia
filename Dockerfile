# ============================================================
# Stage 1: deps — 依存パッケージのインストール
# ============================================================
FROM node:20-alpine AS deps

# libc 互換レイヤー（alpineでネイティブモジュールが必要な場合に備える）
RUN apk add --no-cache libc6-compat

WORKDIR /app

# package.json / package-lock.json だけを先にコピーしてキャッシュを活用
COPY package.json package-lock.json ./

RUN npm ci --frozen-lockfile

# ============================================================
# Stage 2: builder — 本番ビルド
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# deps ステージの node_modules を再利用
COPY --from=deps /app/node_modules ./node_modules

# ソースコード全体をコピー
COPY . .

# Next.js が収集する匿名のテレメトリーを無効化
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ============================================================
# Stage 3: runner — 最小構成の実行イメージ
# ============================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# root 以外のユーザーで実行（セキュリティのため）
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# public が空でも COPY が失敗しないよう先にディレクトリを作成
RUN mkdir -p ./public

# standalone ビルドに必要なファイルだけをコピー
COPY --from=builder /app/public ./public

# .next/standalone は next.config.mjs の output:'standalone' で生成される
# server.js と最小限の node_modules が含まれる
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# standalone の server.js で起動（npm start より軽量）
CMD ["node", "server.js"]
