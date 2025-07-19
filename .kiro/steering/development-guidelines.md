---
inclusion: always
---

# TopicPost 開発ガイドライン

## コーディング規約

### Go (API)
- Clean Architecture パターンを採用
- 依存性注入にWireを使用
- エラーハンドリングは適切に行う
- テストは `*_test.go` ファイルに記述
- パッケージ構成:
  - `entity/`: ドメインエンティティ
  - `usecase/`: ビジネスロジック
  - `interface/`: HTTP ハンドラー
  - `infra/`: 外部依存 (DB, API)

### TypeScript (Web)
- Remix の規約に従う
- コンポーネントは `web/app/components/` に配置
- ページは `web/app/routes/` に配置
- API クライアントは自動生成されたものを使用
- 型安全性を重視し、`any` の使用は避ける

## ファイル命名規則
- Go: snake_case
- TypeScript: kebab-case (ファイル), PascalCase (コンポーネント)
- データベース: snake_case

## Git ワークフロー
- main ブランチは常にデプロイ可能な状態を保つ
- フィーチャーブランチは `feature/` プレフィックスを使用
- コミットメッセージは日本語または英語で明確に記述

### コミット規約
- **1コミット1機能**: 1つのコミットには1つの機能や修正のみを含める
- **適切な粒度**: 小さすぎず、大きすぎない適切なサイズでコミット
- **プレフィックス必須**: コミットメッセージには以下のプレフィックスを使用
  - `feat:` - 新機能追加
  - `fix:` - バグ修正
  - `docs:` - ドキュメント更新
  - `style:` - コードフォーマット、セミコロン追加など
  - `refactor:` - リファクタリング
  - `test:` - テスト追加・修正
  - `chore:` - ビルド、設定ファイル更新など
- **メッセージ形式**: `<prefix>: <説明>` (1行で簡潔に)
- **ファイル指定**: `git add` は変更ファイルを個別に指定する

### コミット例
```bash
git add README.md
git commit -m "docs: READMEにセットアップ手順を追加"

git add api/handler/user.go
git commit -m "feat: ユーザー作成APIエンドポイントを追加"

git add web/package.json web/package-lock.json
git commit -m "chore: React 18.3に依存関係を更新"
```

## API 設計
- OpenAPI 仕様書を先に作成
- RESTful な設計を心がける
- エラーレスポンスは統一フォーマットを使用
- 認証が必要なエンドポイントには JWT を使用

## データベース設計
- マイグレーションファイルは必ず作成
- 外部キー制約を適切に設定
- インデックスを適切に設定
- 論理削除を基本とする