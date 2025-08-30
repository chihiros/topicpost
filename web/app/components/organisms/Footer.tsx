import { Link } from "@remix-run/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold text-white mb-4 block">
              TopicPost
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              全国の子ども会活動を支援するプラットフォームです。
              レクリエーション情報を共有して、地域コミュニティを盛り上げましょう。
            </p>
            <div className="flex space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                🎯 子ども会
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900 text-green-200">
                🤝 コミュニティ
              </span>
            </div>
          </div>

          {/* ナビゲーション */}
          <div>
            <h3 className="text-white font-semibold mb-4">サイトメニュー</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/recreation" className="text-gray-400 hover:text-white transition-colors text-sm">
                  レクリエーション一覧
                </Link>
              </li>
              <li>
                <Link to="/recreation/new" className="text-gray-400 hover:text-white transition-colors text-sm">
                  新規投稿
                </Link>
              </li>
              <li>
                <Link to="/mypage" className="text-gray-400 hover:text-white transition-colors text-sm">
                  マイページ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h3 className="text-white font-semibold mb-4">サポート</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  利用規約
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                  ヘルプ
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@topicpost.net" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  サポート窓口
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} TopicPost. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <p className="text-gray-500 text-xs">
              子ども会活動をもっと楽しく
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}