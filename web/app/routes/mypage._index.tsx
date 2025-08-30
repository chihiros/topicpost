import { Link, useLoaderData, useFetcher } from "@remix-run/react";
import { useState } from "react";
import { BreadcrumbHandle } from "../components/molecules/Breadcrumb";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { requireUser } from "../session.server";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "投稿履歴"
  })
};

// ダミーデータ（実際はAPIから取得）
const dummyPosts = [
  {
    id: "1",
    title: "みんなで楽しむ「だるまさんがころんだ」",
    description: "定番の遊びですが、ルールを工夫することで大人数でも楽しめます。",
    category: ["sports", "communication"],
    targetAge: ["6-8", "9-11"],
    participants: "10-20",
    requiredTime: "15",
    locationType: "outdoor",
    published: true,
    createdAt: "2024-03-01T10:00:00Z",
    organization: "〇〇子ども会",
    prefecture: "東京都"
  },
  {
    id: "2",
    title: "紙コップタワー選手権",
    description: "紙コップを使ってどれだけ高いタワーが作れるか競います。",
    category: ["creative", "brain"],
    targetAge: ["9-11", "12-14"],
    participants: "5-10",
    requiredTime: "30",
    locationType: "indoor",
    published: true,
    createdAt: "2024-02-15T14:30:00Z",
    organization: "〇〇子ども会",
    prefecture: "東京都"
  },
  {
    id: "3",
    title: "【下書き】キャンプファイヤーの準備と進行",
    description: "キャンプファイヤーの準備から進行までの詳細な手順。",
    category: ["communication"],
    targetAge: ["6-8", "9-11", "12-14"],
    participants: "30+",
    requiredTime: "120",
    locationType: "outdoor",
    published: false,
    createdAt: "2024-02-01T09:00:00Z",
    organization: "〇〇子ども会",
    prefecture: "東京都"
  }
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request);
  
  try {
    // ユーザーの投稿を取得 (Go API)
    const response = await fetch(`http://localhost:8686/v1/recreations?user_id=${user.displayName}`);
    
    if (!response.ok) {
      throw new Error('投稿の取得に失敗しました');
    }
    
    const data = await response.json();
    
    // Convert Go API response to expected format
    const posts = data.data.map((recreation: any) => ({
      id: recreation.id.toString(),
      title: recreation.title,
      description: recreation.description || "",
      category: recreation.category || [],
      targetAge: recreation.target_age_min && recreation.target_age_max ? 
        [`${recreation.target_age_min}-${recreation.target_age_max}`] : [],
      participants: recreation.participant_count_min && recreation.participant_count_max ? 
        `${recreation.participant_count_min}-${recreation.participant_count_max}` : "",
      requiredTime: recreation.duration_minutes ? recreation.duration_minutes.toString() : "",
      locationType: recreation.location_type,
      published: true, // All recreations from API are published
      createdAt: recreation.created_at,
      organization: "子ども会", // Default organization
      prefecture: recreation.prefecture || ""
    }));
    
    return json({ posts, user });
  } catch (error) {
    console.error("Error loading posts:", error);
    // エラー時は空配列を返す
    return json({ posts: [], user });
  }
};

const categoryMap: { [key: string]: string } = {
  sports: "運動系",
  brain: "頭脳系",
  creative: "創作系",
  communication: "コミュニケーション"
};

const locationTypeMap: { [key: string]: string } = {
  indoor: "室内",
  outdoor: "屋外",
  both: "両方"
};

export default function MypageIndex() {
  const { posts } = useLoaderData<typeof loader>();
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const fetcher = useFetcher();

  const filteredPosts = posts.filter(post => {
    if (filter === "published") return post.published;
    if (filter === "draft") return !post.published;
    return true;
  });

  const handleDelete = async (postId: string) => {
    if (confirm("この投稿を削除してもよろしいですか？")) {
      try {
        const response = await fetch(`http://localhost:8686/v1/recreations/${postId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Reload the page to refresh the posts
          window.location.reload();
        } else {
          alert('削除に失敗しました');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('削除に失敗しました');
      }
    }
  };

  const handleTogglePublish = (postId: string, currentStatus: boolean) => {
    // Since Go API doesn't have publish/unpublish yet, we'll disable this for now
    alert('公開/非公開機能は今後実装予定です');
  };

  return (
    <div className="container mx-auto px-2 py-2 max-w-6xl">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">投稿履歴</h1>
          <Link
            to="/recreation/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <span className="mr-2">✨</span>
            新規投稿
          </Link>
        </div>

        {/* フィルタータブ */}
        <div className="flex space-x-1 mb-6 border-b">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            すべて ({posts.length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "published"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            公開中 ({posts.filter(p => p.published).length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "draft"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            下書き ({posts.filter(p => !p.published).length})
          </button>
        </div>

        {/* 投稿リスト */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500 mb-4">
              {filter === "draft" ? "下書きはありません" : "投稿がありません"}
            </p>
            <Link
              to="/recreation/new"
              className="text-blue-600 hover:underline"
            >
              最初の投稿を作成する
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="flex-1">
                    {/* タイトルとステータス */}
                    <div className="flex items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">
                        <Link
                          to={`/recreation/${post.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {!post.published && (
                        <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          下書き
                        </span>
                      )}
                    </div>

                    {/* 説明 */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.description}
                    </p>

                    {/* メタ情報 */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.category.map(cat => (
                        <span
                          key={cat}
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
                        >
                          {categoryMap[cat]}
                        </span>
                      ))}
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        {locationTypeMap[post.locationType]}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {post.participants}人
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        {post.requiredTime}分
                      </span>
                    </div>

                    {/* 投稿日時 */}
                    <p className="text-xs text-gray-500">
                      投稿日: {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                    </p>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex lg:flex-col gap-2 mt-4 lg:mt-0 lg:ml-4">
                    <Link
                      to={`/recreation/${post.id}/edit`}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-center"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleTogglePublish(post.id, post.published)}
                      className={`px-3 py-1 text-sm rounded transition-colors text-center ${
                        post.published
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {post.published ? "非公開" : "公開"}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 統計情報 */}
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">投稿統計</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
              <div className="text-sm text-gray-600">総投稿数</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {posts.filter(p => p.published).length}
              </div>
              <div className="text-sm text-gray-600">公開中</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-gray-600">
                {posts.filter(p => !p.published).length}
              </div>
              <div className="text-sm text-gray-600">下書き</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {posts.filter(p => {
                  const date = new Date(p.createdAt);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length}
              </div>
              <div className="text-sm text-gray-600">今月の投稿</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}