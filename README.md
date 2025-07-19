# TopicPost

TopicPostは、Go + Remix + Supabaseで構築されたモダンなフルスタックWebアプリケーションです。

## 🏗️ アーキテクチャ

- **バックエンド**: Go 1.23 + Chi Router + Ent ORM + Wire DI
- **フロントエンド**: Remix + React 19 + TypeScript + Tailwind CSS
- **データベース**: Supabase (PostgreSQL) + Goose Migration
- **API仕様**: OpenAPI 3.0 + 自動型生成
- **インフラ**: Docker + Docker Compose
- **認証**: JWT + Supabase Auth

## 📁 プロジェクト構成

```
topicpost/
├── api/                    # Go APIサーバー
│   ├── di/                # 依存性注入 (Wire)
│   ├── ent/               # Ent ORM スキーマ
│   ├── entity/            # エンティティ定義
│   ├── infra/             # インフラ層 (DB, 外部API)
│   ├── interface/         # インターフェース層 (HTTP Handler)
│   ├── usecase/           # ユースケース層 (ビジネスロジック)
│   └── main.go            # エントリーポイント
├── web/                   # Remix フロントエンド
│   ├── app/               # Remixアプリケーション
│   │   ├── routes/        # ページルーティング
│   │   ├── components/    # Reactコンポーネント
│   │   └── services/      # API クライアント
│   └── package.json       # Node.js依存関係
├── supabase/              # Supabase設定
│   ├── config.toml        # Supabase設定
│   ├── schema/            # DBスキーマ・マイグレーション
│   └── seed.sql           # 初期データ
├── docs/                  # ドキュメント
│   └── openapi/           # OpenAPI仕様書
├── docker-compose.yml     # Docker設定
└── Taskfile.yml          # タスクランナー設定
```

## 🚀 クイックスタート

### 1. 必要なツールのインストール

```bash
# Task (タスクランナー)
brew install go-task

# または npm経由
npm install -g @go-task/cli

# 環境チェック
task check
```

必要なツール一覧：
- [Docker](https://www.docker.com/products/docker-desktop) または [OrbStack](https://orbstack.dev/)
- [Go 1.23+](https://go.dev/doc/install)
- [Node.js 20+](https://nodejs.org/)
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)
- [Goose](https://github.com/pressly/goose) (DBマイグレーション)
- [Wire](https://github.com/google/wire) (依存性注入)
- [Spectral](https://docs.stoplight.io/docs/spectral/b8391e051b7d8-installation) (OpenAPI Lint)

### 2. 開発環境のセットアップ

```bash
# 初期セットアップ (Supabase起動、コード生成など)
task setup

# Dockerイメージのビルド
task build

# APIサーバーの起動
task up
```

### 3. フロントエンドの起動

```bash
# 依存関係のインストール
task npm/i

# OpenAPI型生成
task ogen

# 開発サーバー起動
task run
```

### 4. アクセス

- **フロントエンド**: http://localhost:5173
- **API**: http://localhost:8686
- **Supabase Studio**: http://localhost:54323

## 🛠️ 開発コマンド

### 基本操作
```bash
task setup          # 初期セットアップ
task build          # Dockerビルド
task up             # APIサーバー起動
task down           # 全サービス停止
task check          # 環境チェック
```

### データベース
```bash
task goose/migration/up     # マイグレーション実行
task goose/migration/down   # マイグレーション戻し
task goose/create/migration -- [name]  # 新規マイグレーション作成
task goose/create/seed -- [name]       # 新規シード作成
```

### コード生成
```bash
task gen            # Ent ORM コード生成
task go/wire        # Wire 依存性注入コード生成
task ogen           # OpenAPI TypeScript クライアント生成
task ogen-go        # OpenAPI Go モデル生成
```

### テスト・リント
```bash
task go/test        # Go テスト実行
task olint          # OpenAPI仕様書リント
```

## 🔧 開発ガイド

### API開発
1. `docs/openapi/` でAPI仕様を定義
2. `task ogen-go` でGoモデル生成
3. `api/ent/schema/` でDBスキーマ定義
4. `task gen` でORM生成
5. ハンドラー、ユースケース、インフラ層を実装

### フロントエンド開発
1. `task ogen` でTypeScriptクライアント生成
2. `web/app/routes/` でページ作成
3. `web/app/components/` でコンポーネント作成
4. Supabase Authで認証実装

### データベース変更
1. `task goose/create/migration -- [name]` でマイグレーション作成
2. SQLファイルを編集
3. `task goose/migration/up` で適用

## 🌍 環境設定

### 環境変数
- `.env.supabase.local` - Supabase設定 (自動生成)
- `web/.env` - フロントエンド環境変数

### ポート設定
- API: 8686
- Web: 5173
- Supabase API: 54321
- Supabase Studio: 54323
- PostgreSQL: 54322

## 📚 技術スタック詳細

### バックエンド
- **Go 1.23**: メイン言語
- **Chi Router**: HTTPルーター
- **Ent**: ORM (Facebook製)
- **Wire**: 依存性注入
- **JWT**: 認証トークン

### フロントエンド
- **Remix**: フルスタックReactフレームワーク
- **React 19 Beta**: UIライブラリ
- **TypeScript**: 型安全性
- **Tailwind CSS**: ユーティリティファーストCSS
- **Vite**: ビルドツール

### インフラ・ツール
- **Supabase**: BaaS (PostgreSQL + Auth + Storage)
- **Docker**: コンテナ化
- **Task**: タスクランナー
- **Goose**: DBマイグレーション
- **OpenAPI**: API仕様書
- **Spectral**: API仕様リント

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
