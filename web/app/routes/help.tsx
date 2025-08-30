import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "ヘルプ | TopicPost" },
    { name: "description", content: "TopicPostの使い方やよくあるご質問をご確認ください。" },
  ];
};

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">ヘルプ</h1>
          
          <div className="space-y-12">
            {/* 目次 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">📖 目次</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-blue-900 mb-2">基本機能</h3>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li><a href="#account" className="hover:underline">アカウント登録・ログイン</a></li>
                    <li><a href="#post" className="hover:underline">レクリエーション投稿</a></li>
                    <li><a href="#search" className="hover:underline">レクリエーション検索</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-blue-900 mb-2">サポート</h3>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li><a href="#faq" className="hover:underline">よくあるご質問</a></li>
                    <li><a href="#trouble" className="hover:underline">トラブルシューティング</a></li>
                    <li><a href="#contact" className="hover:underline">お問い合わせ</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* アカウント登録・ログイン */}
            <section id="account">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔑 アカウント登録・ログイン</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">新規登録の方法</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>ヘッダーの「ログイン」ボタンをクリック</li>
                    <li>ログインモーダル下部の「新規登録」をクリック</li>
                    <li>必要な情報を入力して登録完了</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">ログイン方法</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-3 font-medium">以下の方法でログインできます：</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>メールアドレスとパスワード</li>
                      <li>Googleアカウント</li>
                      <li>GitHubアカウント（実装予定）</li>
                      <li>Xアカウント（実装予定）</li>
                      <li>Facebookアカウント（実装予定）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* レクリエーション投稿 */}
            <section id="post">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 レクリエーション投稿</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">投稿方法</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>ログイン後、ヘッダーの「新規投稿」をクリック</li>
                    <li>レクリエーションの詳細情報を入力</li>
                    <li>「投稿する」ボタンをクリックして完了</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">入力項目について</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">必須項目</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li><strong>タイトル：</strong>レクリエーションの名前（3文字以上）</li>
                        <li><strong>説明：</strong>レクリエーションの詳細（10文字以上）</li>
                        <li><strong>カテゴリー：</strong>該当するカテゴリーを選択</li>
                        <li><strong>対象年齢：</strong>適切な年齢層を選択</li>
                        <li><strong>参加人数：</strong>必要な人数を選択</li>
                        <li><strong>所要時間：</strong>おおよその時間を選択</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">任意項目</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li><strong>準備物：</strong>必要な道具や材料</li>
                        <li><strong>ルール・進行方法：</strong>詳細な進行方法</li>
                        <li><strong>注意点：</strong>安全面での注意事項</li>
                        <li><strong>参考URL：</strong>関連サイトのURL</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* レクリエーション検索 */}
            <section id="search">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 レクリエーション検索</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">検索方法</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>ヘッダーの「レクリエーション一覧」から検索可能</li>
                    <li>カテゴリー、対象年齢、参加人数などで絞り込み</li>
                    <li>キーワード検索でタイトルや内容から検索</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">効果的な検索のコツ</h3>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>複数の条件を組み合わせて絞り込む</li>
                      <li>対象年齢を明確にして検索する</li>
                      <li>場所（室内・屋外）を考慮して選択する</li>
                      <li>準備時間を考慮して所要時間で絞り込む</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* よくあるご質問 */}
            <section id="faq">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ よくあるご質問</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 利用料金はかかりますか？</h3>
                  <p className="text-gray-700">A. TopicPostは無料でご利用いただけます。アカウント登録、レクリエーションの投稿・閲覧に料金は一切かかりません。</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 子ども会以外でも利用できますか？</h3>
                  <p className="text-gray-700">A. もちろんです。学校行事、地域イベント、家族での時間など、様々な場面でご活用いただけます。</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 投稿したレクリエーションを編集・削除できますか？</h3>
                  <p className="text-gray-700">A. 現在、投稿の編集・削除機能は開発中です。近日中に実装予定ですので、しばらくお待ちください。</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 不適切な投稿を見つけた場合はどうすればいいですか？</h3>
                  <p className="text-gray-700">A. お問い合わせフォームから該当の投稿について詳細をお知らせください。速やかに対応いたします。</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. パスワードを忘れてしまいました</h3>
                  <p className="text-gray-700">A. 現在、パスワードリセット機能は開発中です。お問い合わせフォームからご連絡いただければ、個別に対応いたします。</p>
                </div>
              </div>
            </section>

            {/* トラブルシューティング */}
            <section id="trouble">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔧 トラブルシューティング</h2>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">ログインできない場合</h3>
                  <ul className="list-disc list-inside space-y-1 text-yellow-800 ml-4">
                    <li>メールアドレスとパスワードが正しく入力されているか確認</li>
                    <li>ブラウザのCookieが有効になっているか確認</li>
                    <li>一度ページをリロードしてから再度お試しください</li>
                    <li>それでも解決しない場合はお問い合わせください</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">投稿ができない場合</h3>
                  <ul className="list-disc list-inside space-y-1 text-yellow-800 ml-4">
                    <li>必須項目がすべて入力されているか確認</li>
                    <li>文字数制限を超えていないか確認</li>
                    <li>ネットワーク接続が安定しているか確認</li>
                    <li>一度ページを更新してから再度お試しください</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">ページが正常に表示されない場合</h3>
                  <ul className="list-disc list-inside space-y-1 text-yellow-800 ml-4">
                    <li>ブラウザのキャッシュをクリアしてください</li>
                    <li>JavaScript が有効になっているか確認</li>
                    <li>最新のブラウザをご利用ください（Chrome、Firefox、Safari、Edge など）</li>
                    <li>アドブロッカーが影響している可能性があります</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* お問い合わせ */}
            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📧 お問い合わせ</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-900 mb-4">
                  上記で解決しない問題や、その他のご質問・ご要望がございましたら、
                  お気軽にお問い合わせください。
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-blue-900">お問い合わせ方法：</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-800 ml-4">
                      <li>
                        <Link to="/contact" className="hover:underline">
                          お問い合わせフォーム
                        </Link>
                        （推奨）
                      </li>
                      <li>
                        <a href="mailto:support@topicpost.net" className="hover:underline">
                          Email: support@topicpost.net
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-900">対応時間：</p>
                    <p className="text-blue-800">平日 9:00-17:00（土日祝日を除く）</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-blue-700">
                      ※お問い合わせの内容によっては回答までお時間をいただく場合があります。
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}