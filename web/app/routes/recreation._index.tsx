import { MetaFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categoryMap, locationTypeMap, prefectureMap } from "~/data/recreations";

export const meta: MetaFunction = () => {
  return [
    { title: "レクリエーション - TopicPost" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const response = await fetch('http://localhost:8686/v1/recreations');
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


export default function RecreationIndex() {
  const { recreations } = useLoaderData<typeof loader>();
  const [filters, setFilters] = useState({
    category: '',
    location_type: '',
    age_range: '',
    search: ''
  });

  const filteredRecreations = useMemo(() => {
    return recreations.filter((recreation: any) => {
      // カテゴリフィルタ
      if (filters.category && !recreation.category.includes(filters.category as 'sports' | 'brain' | 'creative' | 'communication')) {
        return false;
      }

      // 場所フィルタ
      if (filters.location_type && recreation.location_type !== filters.location_type) {
        return false;
      }

      // 年齢フィルタ
      if (filters.age_range) {
        const ageMin = recreation.target_age_min || 0;
        const ageMax = recreation.target_age_max || 100;
        
        switch (filters.age_range) {
          case 'child': // 幼児（3-6歳）
            if (ageMax < 3 || ageMin > 6) return false;
            break;
          case 'elementary': // 小学生（6-12歳）
            if (ageMax < 6 || ageMin > 12) return false;
            break;
          case 'junior': // 中学生（12-15歳）
            if (ageMax < 12 || ageMin > 15) return false;
            break;
        }
      }

      // 検索フィルタ
      if (filters.search) {
        const searchText = filters.search.toLowerCase();
        const titleMatch = recreation.title.toLowerCase().includes(searchText);
        const descriptionMatch = recreation.description?.toLowerCase().includes(searchText) || false;
        const rulesMatch = recreation.rules.toLowerCase().includes(searchText);
        const tipsMatch = recreation.tips?.toLowerCase().includes(searchText) || false;
        
        if (!titleMatch && !descriptionMatch && !rulesMatch && !tipsMatch) {
          return false;
        }
      }

      return true;
    });
  }, [filters, recreations]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      location_type: '',
      age_range: '',
      search: ''
    });
  };

  return (
    <div className="-m-8">
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-br from-green-50 to-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">レクリエーション一覧</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            全国のジュニアリーダーが投稿した<br />
            様々なレクリエーション活動を探してみよう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/recreation/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
              aria-label="新しいレクリエーションを投稿する"
            >
              新規投稿
            </Link>
            <div className="text-sm text-gray-500">
              現在 <span className="font-semibold text-blue-600">{filteredRecreations.length}</span> 件のレクリエーション
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* フィルター・検索エリア */}
      <div className="bg-white rounded-lg shadow p-4 mb-6" role="search" aria-label="レクリエーション検索フィルター">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリ
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              aria-describedby="category-help"
            >
              <option value="">すべて</option>
              <option value="sports">運動系</option>
              <option value="brain">頭脳系</option>
              <option value="creative">創作系</option>
              <option value="communication">コミュニケーション</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              場所
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.location_type}
              onChange={(e) => handleFilterChange('location_type', e.target.value)}
              aria-describedby="location-help"
            >
              <option value="">すべて</option>
              <option value="indoor">屋内</option>
              <option value="outdoor">屋外</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              対象年齢
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.age_range}
              onChange={(e) => handleFilterChange('age_range', e.target.value)}
              aria-describedby="age-help"
            >
              <option value="">すべて</option>
              <option value="child">幼児（3-6歳）</option>
              <option value="elementary">小学生（6-12歳）</option>
              <option value="junior">中学生（12-15歳）</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              検索
            </label>
            <input
              type="text"
              placeholder="キーワードで検索"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              aria-label="レクリエーション検索"
              aria-describedby="search-help"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
            aria-label="すべてのフィルターをリセット"
          >
            フィルタをリセット
          </button>
        </div>
      </div>

      {/* レクリエーション一覧 */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        role="region"
        aria-label="レクリエーション一覧"
        aria-live="polite"
      >
        <AnimatePresence>
          {filteredRecreations.map((recreation) => (
            <motion.div
              key={recreation.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                to={`/recreation/${recreation.id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow block overflow-hidden"
                aria-label={`${recreation.title}の詳細を見る`}
              >
            {/* 画像エリア */}
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
              {/* ヘッダー情報 */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-1 flex-wrap">
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
              </div>

              {/* タイトル */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                {recreation.title}
              </h3>

              {/* 説明 */}
              {recreation.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {recreation.description}
                </p>
              )}

              {/* メタ情報 */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>👥 {recreation.participant_count_min}-{recreation.participant_count_max}人</span>
                  <span>⏱️ {recreation.duration_minutes}分</span>
                </div>
                <div className="flex justify-between">
                  <span>🎯 {recreation.target_age_min}-{recreation.target_age_max}歳</span>
                  {recreation.prefecture && (
                    <span>📍 {prefectureMap[recreation.prefecture]}</span>
                  )}
                </div>
                {recreation.poster_name && (
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-xs">投稿者: {recreation.poster_name}</span>
                  </div>
                )}
              </div>
            </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ページネーション情報 */}
      <div className="mt-8 text-center" role="status" aria-live="polite">
        <p className="text-gray-500">全 {filteredRecreations.length} 件のレクリエーション</p>
      </div>
      </div>
    </div>
  );
}
