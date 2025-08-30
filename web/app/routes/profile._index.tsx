import { Form, Link, useLoaderData, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import { BreadcrumbHandle } from "../components/molecules/Breadcrumb";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { requireUser } from "../session.server";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "プロフィール設定"
  })
};

// プロフィールデータの取得
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request);
  
  try {
    const response = await fetch(`http://localhost:8686/v1/profiles?userId=${user.id}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'プロフィールの取得に失敗しました');
    }
    
    return json({ profile: data.profile, user });
  } catch (error) {
    console.error("Error loading profile:", error);
    // エラー時は現在のユーザー情報でプロフィールを初期化
    const defaultProfile = {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      prefecture: null,
      city: null,
      organization: null,
      role: null,
      activityYears: null,
      bio: null,
      interests: [],
      avatarUrl: null
    };
    return json({ profile: defaultProfile, user });
  }
};

// プロフィールの更新
export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  
  // ユーザーIDをformDataに追加
  formData.set('userId', user.id);
  
  try {
    // FormDataを通常のオブジェクトに変換してJSONで送信
    const data = {
      user_id: user.id,
      display_name: formData.get("displayName") as string,
      email: user.email,
      prefecture: formData.get("prefecture") as string || null,
      city: formData.get("city") as string || null,
      organization: formData.get("organization") as string || null,
      role: formData.get("role") as string || null,
      activity_years: formData.get("activityYears") ? parseInt(formData.get("activityYears") as string) : null,
      bio: formData.get("bio") as string || null,
      avatar_url: null, // 現在は未使用
      interests: formData.getAll("interests") as string[]
    };

    const response = await fetch('http://localhost:8686/v1/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'プロフィールの更新に失敗しました');
    }
    
    return json({ success: true, profile: result.profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return json({ error: "プロフィールの更新に失敗しました" }, { status: 500 });
  }
};

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

const ROLES = [
  "ジュニアリーダー",
  "シニアリーダー", 
  "指導者",
  "保護者",
  "ボランティア",
  "その他"
];

export default function ProfileIndex() {
  const { profile } = useLoaderData<typeof loader>();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile.interests || []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const availableInterests = [
    "レクリエーション", "キャンプ", "工作", "スポーツ", 
    "音楽", "演劇", "料理", "自然体験", "ボランティア"
  ];

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-3xl">👤</span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                <p className="text-blue-100">{profile.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                編集する
              </button>
            )}
          </div>
        </div>

        {/* プロフィール内容 */}
        <div className="p-6">
          {isEditing ? (
            <Form method="post" className="space-y-6">
              {/* 基本情報 */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      表示名
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* 活動地域 */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">活動地域</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      都道府県
                    </label>
                    <select
                      name="prefecture"
                      value={formData.prefecture}
                      onChange={(e) => handleInputChange('prefecture', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">選択してください</option>
                      {PREFECTURES.map(pref => (
                        <option key={pref} value={pref}>{pref}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      市区町村
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="例: 世田谷区"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* 所属情報 */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">所属情報</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      所属団体
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      placeholder="例: 〇〇子ども会"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      役割
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">選択してください</option>
                      {ROLES.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      活動年数
                    </label>
                    <input
                      type="number"
                      name="activityYears"
                      value={formData.activityYears}
                      onChange={(e) => handleInputChange('activityYears', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* 自己紹介 */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">自己紹介</h2>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  placeholder="活動内容や意気込みなどを自由に記入してください"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 興味のある分野 */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">興味のある分野</h2>
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedInterests.includes(interest)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(profile);
                    setSelectedInterests(profile.interests || []);
                  }}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  保存する
                </button>
              </div>
            </Form>
          ) : (
            <div className="space-y-6">
              {/* 基本情報表示 */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">表示名</dt>
                    <dd className="text-gray-900 font-medium">{profile.displayName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">メールアドレス</dt>
                    <dd className="text-gray-900">{profile.email}</dd>
                  </div>
                </dl>
              </div>

              {/* 活動地域表示 */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">活動地域</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">都道府県</dt>
                    <dd className="text-gray-900">{profile.prefecture || "未設定"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">市区町村</dt>
                    <dd className="text-gray-900">{profile.city || "未設定"}</dd>
                  </div>
                </dl>
              </div>

              {/* 所属情報表示 */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">所属情報</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">所属団体</dt>
                    <dd className="text-gray-900">{profile.organization || "未設定"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">役割</dt>
                    <dd className="text-gray-900">{profile.role || "未設定"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">活動年数</dt>
                    <dd className="text-gray-900">{profile.activityYears ? `${profile.activityYears}年` : "未設定"}</dd>
                  </div>
                </dl>
              </div>

              {/* 自己紹介表示 */}
              {profile.bio && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">自己紹介</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
                </div>
              )}

              {/* 興味のある分野表示 */}
              {profile.interests && profile.interests.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">興味のある分野</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map(interest => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 追加のアクション */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/recreation/new"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
        >
          <span className="text-3xl mb-2 block">✨</span>
          <h3 className="font-semibold text-gray-900">活動を投稿</h3>
          <p className="text-sm text-gray-600 mt-1">レクリエーションを共有</p>
        </Link>
        <Link
          to="/recreation"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
        >
          <span className="text-3xl mb-2 block">🎯</span>
          <h3 className="font-semibold text-gray-900">レクを探す</h3>
          <p className="text-sm text-gray-600 mt-1">アイデアを見つける</p>
        </Link>
        <Link
          to="/mypage"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
        >
          <span className="text-3xl mb-2 block">📚</span>
          <h3 className="font-semibold text-gray-900">投稿履歴</h3>
          <p className="text-sm text-gray-600 mt-1">過去の投稿を確認</p>
        </Link>
      </div>
    </div>
  );
}