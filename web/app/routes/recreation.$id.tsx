import { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { recreationsDummyData, categoryMap, locationTypeMap, prefectureMap, Recreation } from "~/data/recreations";
import { BreadcrumbHandle } from "~/components/molecules/Breadcrumb";
import { MediaDisplay } from "~/components/atoms/MediaDisplay";
import { EnhancedMarkdown } from "~/components/molecules/EnhancedMarkdown";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "レクリエーションが見つかりません - TopicPost" }];
  }
  return [
    { title: `${data.title} - TopicPost` },
    { name: "description", content: data.description || data.title }
  ];
};

export const handle: BreadcrumbHandle = {
  breadcrumb: (data: Recreation) => ({
    title: data?.title || "詳細",
    to: `/recreation/${data?.id || ""}`
  })
};

export const loader: LoaderFunction = ({ params }) => {
  const id = parseInt(params.id!);
  const recreation = recreationsDummyData.find(r => r.id === id);
  
  if (!recreation) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return recreation;
};

export default function RecreationDetail() {
  const recreation = useLoaderData<Recreation>();

  return (
    <div>
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 mb-3 flex-wrap justify-center">
            {recreation.category.map((cat) => (
              <span key={cat} className={`px-3 py-1 text-sm rounded-full font-medium ${
                cat === 'sports' ? 'bg-red-100 text-red-800' :
                cat === 'brain' ? 'bg-blue-100 text-blue-800' :
                cat === 'creative' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {categoryMap[cat]}
              </span>
            ))}
            <span className={`px-3 py-1 text-sm rounded-full font-medium ${
              recreation.location_type === 'indoor' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {locationTypeMap[recreation.location_type]}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">{recreation.title}</h1>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
            <span>👥 {recreation.participant_count_min}-{recreation.participant_count_max}人</span>
            <span>⏱️ {recreation.duration_minutes}分</span>
            <span>🎯 {recreation.target_age_min}-{recreation.target_age_max}歳</span>
          </div>
        </div>
      </section>

      <div className="bg-white shadow">
        <div className="p-6">
          {/* コンテンツエリア */}
          <div className="mb-6">
            
            {/* 説明文 */}
            {recreation.description && (
              <div className="mb-6">
                <div className="text-lg text-gray-600 leading-relaxed">
                  <EnhancedMarkdown className="prose prose-gray max-w-none">
                    {recreation.description}
                  </EnhancedMarkdown>
                </div>
              </div>
            )}
            
            {/* 画像エリア - 独立した段落として中央配置 */}
            <div className="mb-6 flex justify-center">
              <div className="max-w-md w-full">
                <MediaDisplay
                  url={recreation.image_url}
                  alt={recreation.title}
                  className="aspect-video w-full rounded-lg overflow-hidden"
                  fallbackIcon={
                    recreation.category.includes('sports') ? '🏃‍♂️' : 
                    recreation.category.includes('brain') ? '🧠' : 
                    recreation.category.includes('creative') ? '🎨' : '🤝'
                  }
                />
              </div>
            </div>
          </div>

          {/* 基本情報 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-1">👥</div>
              <div className="text-sm text-gray-600">参加人数</div>
              <div className="font-semibold">{recreation.participant_count_min}-{recreation.participant_count_max}人</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-sm text-gray-600">所要時間</div>
              <div className="font-semibold">{recreation.duration_minutes}分</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-sm text-gray-600">対象年齢</div>
              <div className="font-semibold">{recreation.target_age_min}-{recreation.target_age_max}歳</div>
            </div>
            
            {recreation.prefecture && (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-1">📍</div>
                <div className="text-sm text-gray-600">投稿地域</div>
                <div className="font-semibold">{prefectureMap[recreation.prefecture]}</div>
              </div>
            )}
          </div>

          {/* 詳細情報 */}
          <div className="space-y-6">
            {/* ルール */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                📜 ルール・遊び方
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <EnhancedMarkdown className="prose prose-blue max-w-none">
                  {recreation.rules}
                </EnhancedMarkdown>
              </div>
            </div>

            {/* 必要な道具 */}
            {recreation.required_items && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  🎒 必要な道具・準備
                </h2>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-700">{recreation.required_items}</p>
                </div>
              </div>
            )}

            {/* コツ・注意点 */}
            {recreation.tips && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  💡 コツ・注意点
                </h2>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <EnhancedMarkdown className="prose prose-yellow max-w-none">
                    {recreation.tips}
                  </EnhancedMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* 投稿者情報 */}
          {recreation.poster_name && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {recreation.poster_name[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{recreation.poster_name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(recreation.created_at).toLocaleDateString('ja-JP')} に投稿
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 関連レクリエーション（将来実装） */}
      <div className="mt-8 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">関連するレクリエーション</h2>
        <div className="text-gray-500 text-center py-8">
          関連するレクリエーションは今後実装予定です
        </div>
      </div>
    </div>
  );
}