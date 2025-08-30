import { MetaFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { categoryMap, locationTypeMap } from "~/data/recreations";

export const meta: MetaFunction = () => {
  return [
    { title: "TopicPost - 全国の子ども会活動を繋ぐコミュニティプラットフォーム" },
    { name: "description", content: "全国のジュニアリーダーが子ども会活動を発信し、他地域から学び合えるコミュニティプラットフォームです。レクリエーション情報を中心に、様々な活動情報を共有できます。" }
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const response = await fetch('http://localhost:8686/v1/recreations?per_page=6&sort=created_at_desc');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'レクリエーション一覧の取得に失敗しました');
    }
    
    return json({ recreations: data.data || [] });
  } catch (error) {
    console.error("Error loading recreations:", error);
    // エラー時は空の配列を返す
    return json({ recreations: [] });
  }
};

export default function Index() {
  const { recreations } = useLoaderData<typeof loader>();
  
  // 最新のレクリエーション（最初の6件を表示）
  const featuredRecreations = recreations.slice(0, 6);
  
  // カテゴリ別の統計情報
  const stats = {
    total: recreations.length,
    sports: recreations.filter((r: any) => r.category.includes('sports')).length,
    brain: recreations.filter((r: any) => r.category.includes('brain')).length,
    creative: recreations.filter((r: any) => r.category.includes('creative')).length,
    communication: recreations.filter((r: any) => r.category.includes('communication')).length,
  };

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            TopicPost
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            全国の子ども会活動を繋ぐコミュニティプラットフォーム<br />
            ジュニアリーダーが活動を発信し、他地域から学び、共に成長しよう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/recreation"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              レクリエーションを探す
            </Link>
            <Link
              to="/recreation/new"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 transition-colors"
            >
              レクリエーションを投稿
            </Link>
          </div>
        </div>
      </section>

      {/* 統計情報セクション */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div className="bg-gray-50 p-6 rounded-lg col-span-2 md:col-span-1">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.total}</div>
              <div className="text-gray-600 font-medium">総レクリエーション数</div>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-red-600 mb-2">{stats.sports}</div>
              <div className="text-gray-600 font-medium">運動系</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.brain}</div>
              <div className="text-gray-600 font-medium">頭脳系</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">{stats.creative}</div>
              <div className="text-gray-600 font-medium">創作系</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.communication}</div>
              <div className="text-gray-600 font-medium">コミュニケーション</div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">TopicPostの特徴</h2>
            <p className="text-gray-600 text-lg">全国の子ども会活動の向上と発展をサポートします</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">活動発信の場</h3>
              <p className="text-gray-600">
                自分たちの子ども会活動を全国に発信し記録できます<br />
                レクリエーションから日常活動まで、あらゆる活動情報を共有
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">相互学習の機会</h3>
              <p className="text-gray-600">
                他地域の優良事例を学び、活動改善に活用できます<br />
                成功事例から失敗談まで、実践的な学びを共有
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">全国ネットワーク</h3>
              <p className="text-gray-600">
                地域を越えて繋がる全国の子ども会コミュニティ<br />
                ジュニアリーダー同士の交流と連帯感を醸成
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 最新レクリエーション紹介 */}
      <section className="bg-gradient-to-br from-green-50 to-blue-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">最新のレクリエーション</h2>
            <p className="text-gray-600 text-lg">新しく投稿されたレクリエーションをチェック</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecreations.map((recreation) => (
              <Link
                key={recreation.id}
                to={`/recreation/${recreation.id}`}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow overflow-hidden"
              >
                {recreation.image_url ? (
                  <div className="aspect-video w-full bg-gray-200">
                    <img 
                      src={recreation.image_url} 
                      alt={`${recreation.title}のイメージ画像`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-gray-400 text-4xl">
                      {recreation.category.includes('sports') ? '🏃‍♂️' : 
                       recreation.category.includes('brain') ? '🧠' : 
                       recreation.category.includes('creative') ? '🎨' : '🤝'}
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex gap-1 flex-wrap mb-3">
                    {recreation.category.map((cat) => (
                      <span key={cat} className={`px-2 py-1 text-xs rounded-full font-medium ${
                        cat === 'sports' ? 'bg-red-100 text-red-800' :
                        cat === 'brain' ? 'bg-blue-100 text-blue-800' :
                        cat === 'creative' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {categoryMap[cat]}
                      </span>
                    ))}
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      recreation.location_type === 'indoor' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {locationTypeMap[recreation.location_type]}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {recreation.title}
                  </h3>
                  
                  {recreation.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {recreation.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>👥 {recreation.participant_count_min}-{recreation.participant_count_max}人</span>
                    <span>⏱️ {recreation.duration_minutes}分</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/recreation"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition-colors"
            >
              すべてのレクリエーションを見る
            </Link>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">あなたも子ども会活動を発信しませんか？</h2>
          <p className="text-xl mb-8 text-blue-100">
            全国のジュニアリーダーと活動を共有し、共に成長しましょう
          </p>
          <Link
            to="/recreation/new"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg inline-block transition-colors"
          >
            今すぐ投稿する
          </Link>
        </div>
      </section>
    </div>
  );
}
