import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // コンテンツ表示アニメーション
    setShowContent(true);

    // クライアントサイドのみでconfettiを実行
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default;
        
        // クラッカーアニメーション
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval: NodeJS.Timeout = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          
          // 左側から
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
          });
          
          // 右側から
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
          });
        }, 250);

        // 初回の大きな花火
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
        });

        return () => clearInterval(interval);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12 sm:px-12 text-center">
            {/* Welcome Animation */}
            <div className={`transform transition-all duration-700 ${showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                ようこそ TopicPost へ！
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                アカウントの作成が完了しました
              </p>
            </div>

            {/* Success Message */}
            <div className={`bg-green-50 border border-green-200 rounded-lg p-6 mb-8 transform transition-all duration-700 delay-300 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="flex justify-center mb-3">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                登録完了！
              </h2>
              <p className="text-green-700">
                TopicPostのコミュニティへようこそ。<br />
                全国の子ども会活動の輪を一緒に広げていきましょう！
              </p>
            </div>

            {/* Next Steps */}
            <div className={`space-y-4 mb-8 transform transition-all duration-700 delay-500 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h3 className="text-lg font-semibold text-gray-900">次のステップ</h3>
              <div className="grid gap-4 text-left">
                <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h4 className="font-medium text-gray-900">プロフィールを設定</h4>
                    <p className="text-sm text-gray-600">あなたの活動地域や所属を登録しましょう</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h4 className="font-medium text-gray-900">レクリエーションを探す</h4>
                    <p className="text-sm text-gray-600">全国の子ども会活動のアイデアを見つけましょう</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h4 className="font-medium text-gray-900">活動を共有</h4>
                    <p className="text-sm text-gray-600">あなたの地域の活動を全国に発信しましょう</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`space-y-3 transform transition-all duration-700 delay-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Link
                to="/recreation"
                className="block w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-lg"
              >
                レクリエーションを探す
              </Link>
              <Link
                to="/"
                className="block w-full py-3 px-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                ホームへ戻る
              </Link>
            </div>

            {/* Footer Message */}
            <div className={`mt-8 pt-6 border-t border-gray-200 transform transition-all duration-700 delay-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <p className="text-sm text-gray-500">
                ご不明な点がございましたら、
                <Link to="/contact" className="text-blue-600 hover:underline">お問い合わせ</Link>
                ページからお気軽にご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}