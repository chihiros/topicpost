# TopicPost - 全国の子ども会活動を繋ぐコミュニティプラットフォーム

TopicPostは、全国のジュニアリーダーが子ども会活動を発信し、他地域から学び合えるコミュニティプラットフォームです。レクリエーション情報を中心に、様々な活動情報を共有できます。

## ✨ 特徴

- 🎯 **レクリエーション共有** - 子ども会で使えるゲームや活動を投稿・検索
- 📱 **完全レスポンシブ** - スマートフォンからデスクトップまで最適化
- 🔍 **高度な検索機能** - カテゴリ、年齢、人数、場所で絞り込み検索
- ✍️ **リッチエディタ** - Markdown対応の直感的な投稿フォーム
- 🌟 **モダンUI** - Tailwind CSSによる美しいデザイン

## 🚀 技術スタック

### フロントエンド
- **[Remix](https://remix.run/)** - フルスタックWebフレームワーク
- **[React 18](https://react.dev/)** - UIライブラリ
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全な開発
- **[Tailwind CSS](https://tailwindcss.com/)** - ユーティリティファーストCSS
- **[Framer Motion](https://www.framer.com/motion/)** - アニメーション

### バックエンド
- **[Go](https://golang.org/)** - 高パフォーマンスAPI
- **[Chi](https://go-chi.io/)** - 軽量HTTPルーター
- **[Ent](https://entgo.io/)** - エンティティフレームワーク
- **[PostgreSQL](https://www.postgresql.org/)** - データベース
- **[Supabase](https://supabase.com/)** - BaaS

### 開発ツール
- **[Vite](https://vitejs.dev/)** - 高速ビルドツール
- **[Vitest](https://vitest.dev/)** - テストフレームワーク
- **[OpenAPI](https://swagger.io/specification/)** - API仕様書

## 🛠️ 開発環境のセットアップ

### 前提条件
- Node.js 18以上
- Go 1.21以上
- PostgreSQL 15以上

### インストール

1. **リポジトリのクローン**
```bash
git clone https://github.com/chihiros/topicpost-web.git
cd topicpost-web
```

2. **依存関係のインストール**
```bash
npm install
```

3. **環境変数の設定**
```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

4. **開発サーバーの起動**
```bash
npm run dev
```

アプリケーションが `http://localhost:5173` で起動します。

## 📁 プロジェクト構成

```
app/
├── components/          # UIコンポーネント
│   ├── atoms/          # 基本的な要素
│   ├── molecules/      # 組み合わせ要素  
│   └── organisms/      # 複合的な要素
├── data/               # ダミーデータ
├── routes/             # ページルーティング
├── services/           # 外部API連携
└── utils/              # ユーティリティ関数
```

## 🎨 デザインシステム

- **Atomic Design** - コンポーネント設計手法
- **Mobile First** - モバイルファーストレスポンシブ
- **Typography** - Tailwind Typographyによる美しい文字体裁

## 📝 API仕様

- **OpenAPI 3.0** - 標準化されたAPI仕様
- **RESTful** - REST原則に基づいた設計
- **JSON** - データ交換形式

## 🧪 テスト

```bash
# テスト実行
npm run test

# テストUI表示
npm run test:ui

# カバレッジ確認
npm run test:coverage
```

## 🚀 本番デプロイ

1. **本番ビルド**
```bash
npm run build
```

2. **本番サーバー起動**
```bash
npm start
```

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！詳細は[CONTRIBUTING.md](CONTRIBUTING.md)をご覧ください。

## 👥 開発チーム

- **[chihiros](https://github.com/chihiros)** - メイン開発者

---

**TopicPost** - 子ども会活動をもっと楽しく、もっと繋がりやすく 🎈
