# Claude Code Docker Development Environment

このプロジェクトをDockerコンテナ内でClaude Codeを使って安全に開発するためのセットアップです。

## 🚀 クイックスタート

### 1. Dockerコンテナを起動

```bash
# コンテナをビルドして起動
docker-compose -f docker-compose.claude.yml up -d --build

# または、直接dockerコマンドで起動
docker build -f Dockerfile.claude -t topicpost-claude .
docker run -it --rm -v $(pwd):/workspace -p 3000:3000 -p 8686:8686 topicpost-claude
```

### 2. コンテナに接続

```bash
# 実行中のコンテナに接続
docker-compose -f docker-compose.claude.yml exec claude-code bash

# または、直接dockerコマンドで接続
docker exec -it topicpost-claude-dev bash
```

### 3. Claude Codeを認証・起動

```bash
# コンテナ内で実行
claude auth
claude
```

## 📁 ファイル構成

- `Dockerfile.claude` - Claude Code開発用のDockerfile
- `docker-compose.claude.yml` - Docker Compose設定
- `docker-entrypoint.sh` - コンテナ起動スクリプト
- `.dockerignore.claude` - Dockerビルド時の除外ファイル

## 🔧 開発環境の機能

### インストールされているツール
- **Node.js 20** - Remix開発用
- **Go** - バックエンドAPI開発用
- **Claude Code CLI** - AIアシスタント
- **Git** - バージョン管理
- **Ripgrep** - 高速テキスト検索
- **Python3** - スクリプト実行用
- **TypeScript, ESLint, Prettier** - 開発ツール

### ポート設定
- `3000` - Remix開発サーバー
- `8686` - Go APIサーバー  
- `8000, 8080, 5173` - 追加の開発用ポート

### ボリュームマウント
- プロジェクトディレクトリ: `/workspace`
- Node.js キャッシュ: 永続化ボリューム
- Git設定: 永続化ボリューム
- Claude Code設定: 永続化ボリューム

## 🛠️ 使用方法

### 基本的な開発フロー

1. **コンテナ起動**
```bash
docker-compose -f docker-compose.claude.yml up -d
```

2. **コンテナに接続**
```bash
docker-compose -f docker-compose.claude.yml exec claude-code bash
```

3. **Claude Code認証（初回のみ）**
```bash
claude auth
```

4. **開発開始**
```bash
# Claude Codeを起動
claude

# 別のターミナルでRemix開発サーバー起動
cd web && npm run dev

# 別のターミナルでGo APIサーバー起動  
cd api && go run main.go
```

### 便利なコマンド

```bash
# コンテナの状態確認
docker-compose -f docker-compose.claude.yml ps

# コンテナのログ確認
docker-compose -f docker-compose.claude.yml logs claude-code

# コンテナを停止
docker-compose -f docker-compose.claude.yml down

# コンテナとボリュームを完全削除
docker-compose -f docker-compose.claude.yml down -v
```

## 🔒 セキュリティ機能

- **no-new-privileges** - 権限昇格を防止
- **リソース制限** - メモリとCPU使用量を制限
- **安全なファイルマウント** - 必要なディレクトリのみマウント
- **分離された環境** - ホストシステムから隔離

## 🚨 トラブルシューティング

### Claude Code認証エラー
```bash
# コンテナ内で再認証
claude auth --reset
```

### ポート競合エラー
```bash
# 使用中のポートを確認
lsof -i :3000
# docker-compose.claude.ymlでポート番号を変更
```

### ファイル権限エラー
```bash
# コンテナ内でファイル権限を確認・修正
chown -R root:root /workspace
chmod -R 755 /workspace
```

### ボリューム権限エラー
```bash
# ボリュームを再作成
docker-compose -f docker-compose.claude.yml down -v
docker-compose -f docker-compose.claude.yml up -d
```

## 📝 注意事項

1. **初回起動時は時間がかかります** - 依存関係のダウンロード・インストールが必要
2. **Claude Code認証は必須です** - 初回のみ `claude auth` を実行
3. **ホストとコンテナでファイル権限に注意** - 必要に応じて権限を調整
4. **機密情報の管理** - .envファイルなどは.dockerignoreで除外済み