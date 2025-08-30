import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "プライバシーポリシー | TopicPost" },
    { name: "description", content: "TopicPostのプライバシーポリシーをご確認ください。" },
  ];
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 基本方針</h2>
              <p>
                TopicPost（以下「当サービス」）は、子ども会活動を支援するプラットフォームとして、
                ユーザーの皆様の個人情報の保護について、社会的使命として取り組んでおります。
                本プライバシーポリシーは、当サービスがどのような個人情報を収集し、
                どのように利用・保護するのか、その取り扱いについて定めるものです。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 収集する情報</h2>
              <p className="mb-3">当サービスは、以下の個人情報を収集することがあります。</p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">2.1 アカウント登録時</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>メールアドレス</li>
                <li>表示名（ニックネーム）</li>
                <li>パスワード（暗号化して保存）</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">2.2 サービス利用時</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>投稿内容（レクリエーション情報、コメント等）</li>
                <li>IPアドレス</li>
                <li>アクセスログ</li>
                <li>Cookie情報</li>
                <li>デバイス情報</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">2.3 ソーシャルログイン利用時</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>各プロバイダーから提供される基本情報（名前、メールアドレス、プロフィール画像等）</li>
                <li>認証に必要な識別情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 情報の利用目的</h2>
              <p className="mb-3">収集した個人情報は、以下の目的で利用します。</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>当サービスの提供・運営</li>
                <li>ユーザー認証</li>
                <li>お問い合わせ・カスタマーサポート対応</li>
                <li>サービスの改善・新機能の開発</li>
                <li>利用状況の分析</li>
                <li>不正利用の防止・セキュリティ維持</li>
                <li>重要なお知らせの通知</li>
                <li>法令に基づく対応</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 情報の第三者提供</h2>
              <p className="mb-3">
                当サービスは、以下の場合を除き、個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ユーザーの同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 情報の管理・保護</h2>
              <p className="mb-3">当サービスは、個人情報の保護のため以下の取り組みを行います。</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>適切な技術的・組織的安全管理措置の実施</li>
                <li>SSL/TLS暗号化による通信の保護</li>
                <li>定期的なセキュリティ監査</li>
                <li>従業員への個人情報保護に関する教育</li>
                <li>アクセス権限の適切な管理</li>
                <li>不正アクセス・紛失・破壊・改ざん・漏洩の防止</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Cookieについて</h2>
              <p className="mb-3">
                当サービスでは、より良いユーザー体験を提供するためにCookieを使用しています。
                Cookieは以下の目的で使用されます。
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>ログイン状態の維持</li>
                <li>ユーザー設定の保存</li>
                <li>サイト利用状況の分析</li>
              </ul>
              <p>
                ブラウザの設定により、Cookieの受け入れを拒否することも可能ですが、
                その場合一部の機能が正常に動作しない可能性があります。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. ユーザーの権利</h2>
              <p className="mb-3">ユーザーは、自身の個人情報について以下の権利を有します。</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>個人情報の開示請求</li>
                <li>個人情報の訂正・追加・削除請求</li>
                <li>個人情報の利用停止・消去請求</li>
                <li>個人情報の第三者提供停止請求</li>
              </ul>
              <p className="mt-3">
                これらの権利を行使される場合は、本人確認の上で対応いたします。
                詳細については、お問い合わせ窓口までご連絡ください。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 外部サービスとの連携</h2>
              <p className="mb-3">
                当サービスでは、以下の外部サービスと連携しています。
                各サービスのプライバシーポリシーもご確認ください。
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Google（ログイン認証、フォーム機能）</li>
                <li>GitHub（ログイン認証）</li>
                <li>X（Twitter）（ログイン認証）</li>
                <li>Facebook（ログイン認証）</li>
                <li>Supabase（データベース・認証基盤）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. 未成年者の個人情報</h2>
              <p>
                当サービスは子ども会活動を対象としておりますが、
                18歳未満の方が当サービスを利用される場合は、
                保護者の同意を得た上でご利用ください。
                また、必要に応じて保護者の方からお問い合わせをお受けいたします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. プライバシーポリシーの変更</h2>
              <p>
                当サービスは、法令の変更やサービス内容の変更等に応じて、
                本プライバシーポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
                重要な変更については、サイト上での告知やメール等で通知いたします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. お問い合わせ</h2>
              <p className="mb-3">
                個人情報の取り扱いに関するご質問やご要望については、以下までお問い合わせください。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">TopicPost サポート窓口</p>
                <p>Email: support@topicpost.net</p>
                <p className="text-sm text-gray-600 mt-2">
                  ※お問い合わせの際は、件名に「個人情報について」と記載してください。
                </p>
              </div>
            </section>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                制定日：2024年1月1日<br />
                最終改定日：2024年8月30日
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}