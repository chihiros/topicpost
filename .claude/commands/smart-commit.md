---
name: smart-commit
description: ファイルの内容を精査して適切な粒度でgit commitを実行
---

# Git Smart Commit

変更されたファイルの内容を分析し、適切な粒度でコミットを作成してください。

## 実行内容

1. `git status` で変更されたファイルを確認
2. `git diff` で変更内容を詳細に分析
3. 変更を以下の基準で分類:
   - 機能追加 (feat)
   - バグ修正 (fix)
   - リファクタリング (refactor)
   - ドキュメント (docs)
   - スタイル変更 (style)
   - テスト (test)
   - ビルド/設定 (chore)

4. 関連する変更をグループ化し、適切な粒度でコミット:
   - 1つの機能/修正につき1コミット
   - 異なる目的の変更は分けてコミット
   - APIとフロントエンドの変更は分けることを検討

5. コミットメッセージは以下の形式で作成:
   ```
   <type>(<scope>): <subject>

   <body>

   🤖 Generated with Claude Code
   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

## コミットメッセージの例

```
feat(recreation): レクリエーション編集・削除機能を実装

- PUT /v1/recreations/{id} エンドポイント追加
- DELETE /v1/recreations/{id} エンドポイント追加  
- 編集ページ (/recreation/{id}/edit) 作成
- 投稿者のみ編集・削除可能な権限制御を追加

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

## 注意事項

- センシティブな情報が含まれていないか確認
- .envファイルなどの設定ファイルはコミットしない
- node_modules、distなどのビルド成果物は除外
- 大きな変更は複数の論理的なコミットに分割

## 実行手順

1. 変更内容を分析
2. コミット計画を提示
3. ユーザーの確認を得る
4. 順次コミットを実行

必要に応じて `git add -p` を使用して部分的なステージングを行ってください。