import { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, Form, useActionData, useNavigation } from "@remix-run/react";
import { requireUser } from "~/session.server";
import { BreadcrumbHandle } from "~/components/molecules/Breadcrumb";
import { useState } from "react";
import { categoryMap, locationTypeMap, prefectureMap } from "~/data/recreations";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "レクリエーション編集 - TopicPost" }];
  }
  return [
    { title: `${data.recreation.title}の編集 - TopicPost` },
  ];
};

export const handle: BreadcrumbHandle = {
  breadcrumb: (data: any) => ({
    title: data?.recreation?.title ? `${data.recreation.title}の編集` : "編集",
    to: `/recreation/${data?.recreation?.id || ""}/edit`
  })
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const user = await requireUser(request);
  const id = params.id!;
  
  try {
    const apiUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8686';
    const response = await fetch(`${apiUrl}/v1/recreations/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Response("レクリエーションが見つかりません", { status: 404 });
      }
      throw new Response("レクリエーション情報の取得に失敗しました", { status: 500 });
    }
    
    const data = await response.json();
    return json({ recreation: data.data, user });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error("Error loading recreation:", error);
    throw new Response("レクリエーション情報の取得に失敗しました", { status: 500 });
  }
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const user = await requireUser(request);
  const id = params.id!;
  
  try {
    const formData = await request.formData();
    
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string || undefined,
      target_age_min: parseInt(formData.get("target_age_min") as string) || undefined,
      target_age_max: parseInt(formData.get("target_age_max") as string) || undefined,
      participant_count_min: parseInt(formData.get("participant_count_min") as string) || undefined,
      participant_count_max: parseInt(formData.get("participant_count_max") as string) || undefined,
      duration_minutes: parseInt(formData.get("duration_minutes") as string) || undefined,
      required_items: formData.get("required_items") as string || undefined,
      rules: formData.get("rules") as string,
      tips: formData.get("tips") as string || undefined,
      prefecture: formData.get("prefecture") as string || undefined,
      category: formData.getAll("category") as string[],
      location_type: formData.get("location_type") as string,
      image_url: formData.get("image_url") as string || undefined,
      poster_name: user.displayName
    };

    const apiUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8686';
    const response = await fetch(`${apiUrl}/v1/recreations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'エラーが発生しました' }));
      return json({ error: errorData.message || 'レクリエーションの更新に失敗しました' }, { status: 400 });
    }

    return redirect(`/recreation/${id}`);
  } catch (error) {
    console.error("Error updating recreation:", error);
    return json({ error: 'レクリエーションの更新に失敗しました' }, { status: 500 });
  }
};

export default function RecreationEdit() {
  const { recreation } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [imageUrl, setImageUrl] = useState(recreation.image_url || "");

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">レクリエーション編集</h1>
          <p className="text-gray-600">レクリエーション情報を更新してください。</p>
        </div>

        {actionData?.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{actionData.error}</p>
          </div>
        )}

        <Form method="post" className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={recreation.title}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="レクリエーションのタイトルを入力してください"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                概要・説明
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={recreation.description || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="レクリエーションの概要や特徴を入力してください"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  カテゴリ <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {Object.entries(categoryMap).map(([key, label]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        name="category"
                        value={key}
                        defaultChecked={recreation.category.includes(key)}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="location_type" className="block text-sm font-medium text-gray-700 mb-1">
                  場所 <span className="text-red-500">*</span>
                </label>
                <select
                  id="location_type"
                  name="location_type"
                  required
                  defaultValue={recreation.location_type}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.entries(locationTypeMap).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="target_age_min" className="block text-sm font-medium text-gray-700 mb-1">
                  対象年齢（最小）
                </label>
                <input
                  type="number"
                  id="target_age_min"
                  name="target_age_min"
                  min="0"
                  max="99"
                  defaultValue={recreation.target_age_min || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3"
                />
              </div>

              <div>
                <label htmlFor="target_age_max" className="block text-sm font-medium text-gray-700 mb-1">
                  対象年齢（最大）
                </label>
                <input
                  type="number"
                  id="target_age_max"
                  name="target_age_max"
                  min="0"
                  max="99"
                  defaultValue={recreation.target_age_max || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="12"
                />
              </div>

              <div>
                <label htmlFor="participant_count_min" className="block text-sm font-medium text-gray-700 mb-1">
                  参加人数（最小）
                </label>
                <input
                  type="number"
                  id="participant_count_min"
                  name="participant_count_min"
                  min="1"
                  defaultValue={recreation.participant_count_min || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5"
                />
              </div>

              <div>
                <label htmlFor="participant_count_max" className="block text-sm font-medium text-gray-700 mb-1">
                  参加人数（最大）
                </label>
                <input
                  type="number"
                  id="participant_count_max"
                  name="participant_count_max"
                  min="1"
                  defaultValue={recreation.participant_count_max || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration_minutes" className="block text-sm font-medium text-gray-700 mb-1">
                  所要時間（分）
                </label>
                <input
                  type="number"
                  id="duration_minutes"
                  name="duration_minutes"
                  min="1"
                  defaultValue={recreation.duration_minutes || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="30"
                />
              </div>

              <div>
                <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700 mb-1">
                  都道府県
                </label>
                <select
                  id="prefecture"
                  name="prefecture"
                  defaultValue={recreation.prefecture || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">選択してください</option>
                  {Object.entries(prefectureMap).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-1">
                ルール・遊び方 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="rules"
                name="rules"
                required
                rows={6}
                defaultValue={recreation.rules}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="レクリエーションのルールや遊び方を詳しく説明してください"
              />
            </div>

            <div>
              <label htmlFor="required_items" className="block text-sm font-medium text-gray-700 mb-1">
                必要な道具・準備
              </label>
              <textarea
                id="required_items"
                name="required_items"
                rows={3}
                defaultValue={recreation.required_items || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="必要な道具や事前準備について入力してください"
              />
            </div>

            <div>
              <label htmlFor="tips" className="block text-sm font-medium text-gray-700 mb-1">
                コツ・注意点
              </label>
              <textarea
                id="tips"
                name="tips"
                rows={3}
                defaultValue={recreation.tips || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="成功のコツや注意点があれば入力してください"
              />
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
                画像・動画URL
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="画像や動画のURLを入力してください"
              />
              <p className="mt-1 text-sm text-gray-500">
                画像や動画のURLを入力してください（例: https://example.com/image.jpg）
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "更新中..." : "レクリエーションを更新"}
            </button>
            
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 sm:flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}