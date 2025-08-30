import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "お問い合わせ | TopicPost" },
    { name: "description", content: "TopicPostに関するお問い合わせはこちらから。ご質問やご要望をお聞かせください。" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const googleFormId = process.env.CONTACT_GOOGLE_FORM_ID;
  return Response.json({ googleFormId });
}

export default function Contact() {
  const { googleFormId } = useLoaderData<typeof loader>();
  const googleFormUrl = `https://docs.google.com/forms/d/e/${googleFormId}/viewform`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
            <p className="text-gray-600">
              TopicPostに関するご質問やご要望がございましたら、<br />
              下記のフォームからお気軽にお問い合わせください。
            </p>
          </div>

          {/* お問い合わせ前のご案内 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">📋 お問い合わせ前にご確認ください</h2>
            <div className="space-y-2 text-blue-800">
              <p>よくある質問につきましては、<a href="/help" className="text-blue-600 hover:underline font-medium">ヘルプページ</a>をご確認ください。</p>
              <p>技術的な問題については、<a href="/help#trouble" className="text-blue-600 hover:underline font-medium">トラブルシューティング</a>をお試しください。</p>
            </div>
          </div>

          {/* お問い合わせフォーム */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 お問い合わせフォーム</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                {googleFormId ? (
                  <iframe
                    src={googleFormUrl}
                    width="100%"
                    height="800"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    className="rounded-lg"
                    title="お問い合わせフォーム"
                  >
                    読み込み中…
                  </iframe>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">
                      お問い合わせフォームが読み込めませんでした。<br />
                      下記のメールアドレスまで直接ご連絡ください。
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
                      <p className="font-medium text-gray-900">Email:</p>
                      <a 
                        href="mailto:support@topicpost.net" 
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        support@topicpost.net
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* その他の連絡方法 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📧 その他の連絡方法</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">メールでのお問い合わせ</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Email:</strong> 
                      <a 
                        href="mailto:support@topicpost.net" 
                        className="ml-1 text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        support@topicpost.net
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong>対応時間:</strong> 平日 9:00-17:00
                    </p>
                    <p className="text-sm text-gray-600">
                      ※土日祝日を除く、回答まで1-2営業日お時間をいただく場合があります
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">お問い合わせ内容について</h3>
                  <div className="space-y-2">
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>サービスの使い方について</li>
                      <li>技術的な問題・不具合報告</li>
                      <li>新機能のご要望・ご提案</li>
                      <li>コンテンツに関するご報告</li>
                      <li>その他のご質問</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 注意事項 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">⚠️ お問い合わせに関する注意事項</h3>
              <ul className="list-disc list-inside space-y-2 text-yellow-800">
                <li>個人情報を含む内容については、適切に管理・保護いたします</li>
                <li>お問い合わせ内容によっては、回答までお時間をいただく場合があります</li>
                <li>内容によっては回答できない場合がございます</li>
                <li>営業・勧誘目的のお問い合わせはご遠慮ください</li>
                <li>緊急性の高い問題については、メールでのお問い合わせをお願いします</li>
              </ul>
            </div>

            {/* よくある問い合わせ */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">❓ よくお問い合わせいただく内容</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">パスワードを忘れた</h4>
                  <p className="text-sm text-gray-600">
                    現在、パスワードリセット機能は開発中です。メールでご連絡いただければ個別に対応いたします。
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">投稿の編集・削除</h4>
                  <p className="text-sm text-gray-600">
                    現在開発中の機能です。緊急の場合はお問い合わせください。
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">不適切な投稿を発見した</h4>
                  <p className="text-sm text-gray-600">
                    該当の投稿URLと問題点を明記してお問い合わせください。
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">新機能の要望</h4>
                  <p className="text-sm text-gray-600">
                    ユーザーの皆様からのご要望をお待ちしています。詳しくお聞かせください。
                  </p>
                </div>
              </div>
            </div>

            {/* サポート情報 */}
            <div className="text-center bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🤝 TopicPost サポートチーム</h3>
              <p className="text-gray-700 mb-3">
                全国の子ども会活動をサポートするため、日々サービスの改善に取り組んでいます。
              </p>
              <p className="text-sm text-gray-600">
                皆様のご意見・ご要望が、より良いサービス作りに繋がります。<br />
                お気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}