---
inclusion: always
---

# TopicPost プロジェクト概要

## アーキテクチャ
- **バックエンド**: Go 1.23 + Chi Router + Ent ORM
- **フロントエンド**: Remix + React + TypeScript + Tailwind CSS
- **データベース**: Supabase (PostgreSQL)
- **インフラ**: Docker + Docker Compose
- **ビルドツール**: Task (Taskfile.yml)

## プロジェクト構成
```
topicpost/
├── api/                    # Go APIサーバー
│   ├── di/                # 依存性注入 (Wire)
│   ├── ent/               # Ent ORM スキーマ
│   ├── entity/            # エンティティ定義
│   ├── infra/             # インフラ層
│   ├── interface/         # インターフェース層
│   ├── usecase/           # ユースケース層
│   └── main.go            # エントリーポイント
├── web/                   # Remix フロントエンド
│   ├── app/               # Remixアプリケーション
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

## 開発フロー
1. `task setup` - 初期セットアップ
2. `task build` - Dockerビルド
3. `task up` - APIサーバー起動
4. `task npm/i && task run` - フロントエンド起動

## 技術スタック詳細
- **API**: Go + Chi + Ent + Wire + JWT認証
- **フロントエンド**: Remix + React 19 Beta + TypeScript + Tailwind
- **DB**: Supabase PostgreSQL + Goose マイグレーション
- **API仕様**: OpenAPI 3.0 + TypeScript型生成
- **開発ツール**: Task, Docker, Spectral (OpenAPI Lint)

## 重要なコマンド
- `task check` - 環境チェック
- `task gen` - Ent ORM コード生成
- `task go/wire` - Wire 依存性注入コード生成
- `task ogen` - OpenAPI TypeScript クライアント生成
- `task goose/migration/up` - DBマイグレーション実行