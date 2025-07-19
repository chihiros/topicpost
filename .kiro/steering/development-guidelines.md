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