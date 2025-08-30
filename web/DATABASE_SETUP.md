# Database Setup Guide

このドキュメントでは、TopicPostプロジェクトのデータベース設定方法を説明します。

## 前提条件

- PostgreSQL 15以上がインストールされていること
- Node.js 18以上がインストールされていること

## セットアップ手順

### 1. PostgreSQLデータベースの作成

```bash
# PostgreSQLにログイン
psql -U postgres

# データベース作成
CREATE DATABASE topicpost;

# ユーザー作成（任意）
CREATE USER topicpost_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE topicpost TO topicpost_user;

# 終了
\q
```

### 2. 環境変数の設定

```bash
# .envファイルをコピー
cp .env.example .env
```

`.env`ファイルを編集して、データベース接続情報を設定：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/topicpost?schema=public"
SITE_URL="http://localhost:5173"
```

### 3. Prismaクライアントの生成とマイグレーション

```bash
# Prismaクライアント生成
npx prisma generate

# データベースマイグレーション実行
npx prisma migrate dev --name init

# （オプション）Prisma Studioでデータベース確認
npx prisma studio
```

### 4. 開発サーバー起動

```bash
npm run dev
```

## データベーススキーマ

### User（ユーザー）

| Column | Type | Description |
|--------|------|-------------|
| id | String | ユーザーID（CUID） |
| email | String | メールアドレス（一意） |
| displayName | String | 表示名 |
| prefecture | String? | 都道府県 |
| city | String? | 市区町村 |
| organization | String? | 所属団体 |
| role | String? | 役割 |
| activityYears | Int? | 活動年数 |
| bio | String? | 自己紹介 |
| avatarUrl | String? | アバター画像URL |
| interests | String[] | 興味のある分野 |
| createdAt | DateTime | 作成日時 |
| updatedAt | DateTime | 更新日時 |

### Profile（プロフィール）

ユーザーの詳細プロフィール情報を管理。UserとOne-to-One関係。

### Post（投稿）

| Column | Type | Description |
|--------|------|-------------|
| id | String | 投稿ID（CUID） |
| userId | String | ユーザーID |
| title | String | タイトル |
| description | String | 説明 |
| category | String[] | カテゴリ |
| targetAge | String[] | 対象年齢 |
| participants | String | 参加人数 |
| requiredTime | String | 所要時間 |
| locationType | String | 場所タイプ |
| materials | String? | 必要な材料 |
| rules | String? | ルール |
| tips | String? | コツ |
| imageUrl | String? | 画像URL |
| prefecture | String? | 都道府県 |
| organization | String? | 所属団体 |
| published | Boolean | 公開状態 |
| createdAt | DateTime | 作成日時 |
| updatedAt | DateTime | 更新日時 |

## API エンドポイント

### プロフィール

- `GET /api/profile` - プロフィール取得
- `POST /api/profile` - プロフィール更新

### 投稿

- `GET /api/posts` - 投稿一覧取得
- `POST /api/posts` - 新規投稿作成

## トラブルシューティング

### データベース接続エラー

1. PostgreSQLが起動しているか確認
2. `.env`ファイルのDATABASE_URLが正しいか確認
3. データベースとユーザーが作成されているか確認

### マイグレーションエラー

```bash
# マイグレーションをリセット
npx prisma migrate reset

# マイグレーションを再実行
npx prisma migrate dev --name init
```

### 開発データの投入

```bash
# プロフィールページで初回アクセス時に自動でデモユーザーが作成されます
# または、Prisma Studioを使用してテストデータを手動追加
npx prisma studio
```

## 本番環境での設定

本番環境では以下の点に注意：

1. 強固なパスワードの使用
2. SSL接続の有効化
3. 環境変数の適切な管理
4. データベースバックアップの設定

```env
# 本番環境例
DATABASE_URL="postgresql://user:password@your-db-host:5432/topicpost?schema=public&sslmode=require"
SITE_URL="https://your-domain.com"
```