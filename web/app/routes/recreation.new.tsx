import { MetaFunction, ActionFunction, redirect, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { prefectureMap, categoryMap, locationTypeMap } from "~/data/recreations";
import { BreadcrumbHandle } from "~/components/molecules/Breadcrumb";
import { MediaDisplay } from "~/components/atoms/MediaDisplay";
import { EnhancedMarkdown } from "~/components/molecules/EnhancedMarkdown";
import { requireUser } from "../session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "レクリエーション投稿 - TopicPost" },
  ];
};

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "新規投稿",
    to: "/recreation/new"
  })
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request);
  return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  
  // ユーザーIDをformDataに追加
  formData.set('userId', user.id);
  
  try {
    // FormDataを通常のオブジェクトに変換してJSONで送信
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string || null,
      target_age_min: formData.get("target_age_min") ? parseInt(formData.get("target_age_min") as string) : null,
      target_age_max: formData.get("target_age_max") ? parseInt(formData.get("target_age_max") as string) : null,
      participant_count_min: formData.get("participant_count_min") ? parseInt(formData.get("participant_count_min") as string) : null,
      participant_count_max: formData.get("participant_count_max") ? parseInt(formData.get("participant_count_max") as string) : null,
      duration_minutes: formData.get("duration_minutes") ? parseInt(formData.get("duration_minutes") as string) : null,
      required_items: formData.get("required_items") as string || null,
      rules: formData.get("rules") as string,
      tips: formData.get("tips") as string || null,
      prefecture: formData.get("prefecture") as string || null,
      category: formData.getAll("category") as string[],
      location_type: formData.get("location_type") as string,
      image_url: formData.get("image_url") as string || null,
      poster_name: formData.get("poster_name") as string || null,
    };

    const response = await fetch('http://localhost:8686/v1/recreations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || '投稿の作成に失敗しました');
    }
    
    // 成功時は作成された投稿の詳細ページまたは投稿履歴にリダイレクト
    return redirect(`/mypage`);
  } catch (error) {
    console.error("Error creating post:", error);
    // エラー時は現在のページに戻る（エラーメッセージは後で実装）
    return redirect("/recreation/new?error=1");
  }
};

export default function RecreationNew() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  // フォーム入力用のstate
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: [] as string[],
    location_type: '',
    prefecture: '',
    participant_count_min: '',
    participant_count_max: '',
    target_age_min: '',
    target_age_max: '',
    duration_minutes: '',
    required_items: '',
    rules: '',
    tips: '',
    poster_name: ''
  });

  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // プレビュー用のデータを作成
  const previewData = {
    id: 999,
    title: formData.title || 'レクリエーション名を入力してください',
    description: formData.description || undefined,
    image_url: formData.image_url || undefined,
    target_age_min: parseInt(formData.target_age_min) || 0,
    target_age_max: parseInt(formData.target_age_max) || 100,
    participant_count_min: parseInt(formData.participant_count_min) || 1,
    participant_count_max: parseInt(formData.participant_count_max) || 10,
    duration_minutes: parseInt(formData.duration_minutes) || 0,
    required_items: formData.required_items || '特になし',
    rules: formData.rules || 'ルールを入力してください',
    tips: formData.tips || undefined,
    prefecture: formData.prefecture || undefined,
    category: formData.category.length > 0 ? formData.category[0] as 'sports' | 'brain' | 'creative' | 'communication' : 'sports',
    location_type: formData.location_type as 'indoor' | 'outdoor' || 'indoor',
    poster_name: formData.poster_name || '匿名',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  return (
    <div className="-m-8 min-h-screen bg-white">
      {/* モバイル用タブナビゲーション */}
      <div className="lg:hidden sticky top-16 bg-white border-b z-20">
        <div className="flex">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'form'
                ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📝 入力フォーム
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'preview'
                ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            👀 プレビュー
          </button>
        </div>
      </div>

      <div className="lg:flex lg:h-screen lg:overflow-hidden">
        {/* 左側: 入力フォーム */}
        <div className={`lg:w-1/2 overflow-y-auto bg-white ${
          activeTab === 'form' ? 'block' : 'hidden lg:block'
        }`}>
        <div className="p-6 max-w-4xl mx-auto">
            {/* ヘッダー */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">レクリエーション投稿</h1>
              <p className="text-gray-600">新しいレクリエーションを投稿して、みんなで情報を共有しましょう！</p>
            </div>

            {/* Markdownヘルプ */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">📝 Markdown記法が使えます</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><code>**太字**</code> → <strong>太字</strong></p>
                <p><code>- リスト</code> → • リスト</p>
                <p><code>## 見出し</code> → 見出し</p>
                <p><code>&gt; 引用</code> → 引用文</p>
              </div>
            </div>

            <Form method="post" className="space-y-4">
              {/* 基本情報 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ゲーム名/活動名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="だるまさんがころんだ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    画像/動画URL（オプション）
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg または https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    画像のURL、YouTubeの動画URLを入力できます
                  </p>
                </div>
              </div>

              {/* 説明 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  概要・説明
                </label>
                <textarea
                  name="description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="このレクリエーションの魅力や特徴を**Markdown記法**で説明してください..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              {/* カテゴリ・場所設定 */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {Object.entries(categoryMap).map(([key, label]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          name="category"
                          value={key}
                          checked={formData.category.includes(key)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const newCategories = e.target.checked
                              ? [...formData.category, value]
                              : formData.category.filter(c => c !== value);
                            handleInputChange('category', newCategories);
                          }}
                          className="mr-2 rounded"
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    場所 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="location_type"
                    required
                    value={formData.location_type}
                    onChange={(e) => handleInputChange('location_type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    <option value="indoor">屋内</option>
                    <option value="outdoor">屋外</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    都道府県
                  </label>
                  <select
                    name="prefecture"
                    value={formData.prefecture}
                    onChange={(e) => handleInputChange('prefecture', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    {Object.entries(prefectureMap).map(([code, name]) => (
                      <option key={code} value={code}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 人数・時間設定 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最小参加人数
                  </label>
                  <input
                    type="number"
                    name="participant_count_min"
                    min="1"
                    value={formData.participant_count_min}
                    onChange={(e) => handleInputChange('participant_count_min', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最大参加人数
                  </label>
                  <input
                    type="number"
                    name="participant_count_max"
                    min="1"
                    value={formData.participant_count_max}
                    onChange={(e) => handleInputChange('participant_count_max', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    対象年齢（最小）
                  </label>
                  <input
                    type="number"
                    name="target_age_min"
                    min="1"
                    max="100"
                    value={formData.target_age_min}
                    onChange={(e) => handleInputChange('target_age_min', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    対象年齢（最大）
                  </label>
                  <input
                    type="number"
                    name="target_age_max"
                    min="1"
                    max="100"
                    value={formData.target_age_max}
                    onChange={(e) => handleInputChange('target_age_max', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="12"
                  />
                </div>
              </div>

              {/* 所要時間・必要道具 */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    所要時間（分）
                  </label>
                  <input
                    type="number"
                    name="duration_minutes"
                    min="1"
                    value={formData.duration_minutes}
                    onChange={(e) => handleInputChange('duration_minutes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    必要な道具・準備
                  </label>
                  <input
                    type="text"
                    name="required_items"
                    value={formData.required_items}
                    onChange={(e) => handleInputChange('required_items', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="特になし"
                  />
                </div>
              </div>

              {/* ルール */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ルール・遊び方 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="rules"
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="## 基本ルール&#10;1. **鬼を1人決める**&#10;2. 他の人はスタート位置に並ぶ..."
                  value={formData.rules}
                  onChange={(e) => handleInputChange('rules', e.target.value)}
                />
              </div>

              {/* コツ・注意点 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  コツ・注意点
                </label>
                <textarea
                  name="tips"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="## 安全に楽しむために&#10;⚠️ **注意事項**&#10;- 安全な場所で行う..."
                  value={formData.tips}
                  onChange={(e) => handleInputChange('tips', e.target.value)}
                />
              </div>

              {/* 投稿者名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  投稿者名（ハンドルネーム）
                </label>
                <input
                  type="text"
                  name="poster_name"
                  value={formData.poster_name}
                  onChange={(e) => handleInputChange('poster_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="東京のリーダー"
                />
                <p className="text-sm text-gray-500 mt-1">空欄の場合は「匿名」として投稿されます</p>
              </div>

              {/* 投稿ボタン */}
              <div className="flex justify-end gap-4 pt-6">
                <Link
                  to="/recreation"
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSubmitting ? '投稿中...' : '投稿する'}
                </button>
              </div>
            </Form>
          </div>
      </div>

        {/* 右側: プレビューエリア */}
        <div className={`lg:w-1/2 bg-gray-100 overflow-y-auto ${
          activeTab === 'preview' ? 'block' : 'hidden lg:block'
        }`}>
        <div className="p-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {/* ヘッダー */}
              <div className="mb-6">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {formData.category.length > 0 ? (
                    formData.category.map((cat) => (
                      <span key={cat} className={`px-3 py-1 text-sm rounded-full font-medium ${
                        cat === 'sports' ? 'bg-red-100 text-red-800' :
                        cat === 'brain' ? 'bg-blue-100 text-blue-800' :
                        cat === 'creative' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {categoryMap[cat]}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 text-sm rounded-full font-medium bg-gray-100 text-gray-800">
                      カテゴリを選択してください
                    </span>
                  )}
                  <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                    previewData.location_type === 'indoor' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {locationTypeMap[previewData.location_type] || '場所を選択'}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{previewData.title}</h1>
                
                {/* 説明文 */}
                {previewData.description && (
                  <div className="mb-6">
                    <div className="text-lg text-gray-600 leading-relaxed">
                      <EnhancedMarkdown className="prose prose-gray max-w-none">
                        {previewData.description}
                      </EnhancedMarkdown>
                    </div>
                  </div>
                )}
                
                {/* 画像エリア */}
                <div className="mb-6 flex justify-center">
                  <div className="max-w-md w-full">
                    <MediaDisplay
                      url={previewData.image_url}
                      alt={previewData.title}
                      className="aspect-video w-full rounded-lg overflow-hidden"
                      fallbackIcon={
                        formData.category.includes('sports') ? '🏃‍♂️' : 
                        formData.category.includes('brain') ? '🧠' : 
                        formData.category.includes('creative') ? '🎨' : '🤝'
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
                  <div className="font-semibold">{previewData.participant_count_min}-{previewData.participant_count_max}人</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-1">⏱️</div>
                  <div className="text-sm text-gray-600">所要時間</div>
                  <div className="font-semibold">{previewData.duration_minutes}分</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-sm text-gray-600">対象年齢</div>
                  <div className="font-semibold">{previewData.target_age_min}-{previewData.target_age_max}歳</div>
                </div>
                
                {previewData.prefecture && (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-1">📍</div>
                    <div className="text-sm text-gray-600">投稿地域</div>
                    <div className="font-semibold">{prefectureMap[previewData.prefecture]}</div>
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
                      {previewData.rules}
                    </EnhancedMarkdown>
                  </div>
                </div>

                {/* 必要な道具 */}
                {previewData.required_items && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      🎒 必要な道具・準備
                    </h2>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-gray-700">{previewData.required_items}</p>
                    </div>
                  </div>
                )}

                {/* コツ・注意点 */}
                {previewData.tips && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      💡 コツ・注意点
                    </h2>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <EnhancedMarkdown className="prose prose-yellow max-w-none">
                        {previewData.tips}
                      </EnhancedMarkdown>
                    </div>
                  </div>
                )}
              </div>

              {/* 投稿者情報 */}
              {previewData.poster_name && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {previewData.poster_name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{previewData.poster_name}</p>
                      <p className="text-sm text-gray-500">
                        プレビュー表示
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}