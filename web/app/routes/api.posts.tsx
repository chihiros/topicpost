import { ActionFunctionArgs, json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

// GET: 投稿一覧取得
export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const published = url.searchParams.get("published") === "true";
  
  try {
    const where: any = {};
    if (userId) where.userId = userId;
    if (published !== null) where.published = published;
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        user: {
          select: {
            displayName: true,
            organization: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return json({ error: "投稿の取得に失敗しました" }, { status: 500 });
  }
};

// POST: 新規投稿作成
export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return json({ error: "メソッドが許可されていません" }, { status: 405 });
  }

  // 認証されたユーザーを取得
  const authUser = await getUser(request);
  if (!authUser) {
    return json({ error: "認証が必要です" }, { status: 401 });
  }

  const formData = await request.formData();
  const userId = formData.get("userId") as string || authUser.id;
  
  try {
    // 参加人数の設定
    const participant_count_min = formData.get("participant_count_min") as string;
    const participant_count_max = formData.get("participant_count_max") as string;
    const participants = participant_count_min && participant_count_max 
      ? `${participant_count_min}-${participant_count_max}人`
      : "1-10人";

    // 対象年齢の設定
    const target_age_min = formData.get("target_age_min") as string;
    const target_age_max = formData.get("target_age_max") as string;
    const targetAge = target_age_min && target_age_max 
      ? [`${target_age_min}-${target_age_max}歳`]
      : ["全年齢"];

    // 所要時間の設定
    const duration_minutes = formData.get("duration_minutes") as string;
    const requiredTime = duration_minutes ? `${duration_minutes}分` : "15分";

    const data = {
      userId,
      title: formData.get("title") as string,
      description: formData.get("description") as string || "",
      category: formData.getAll("category") as string[],
      targetAge,
      participants,
      requiredTime,
      locationType: formData.get("location_type") as string,
      materials: formData.get("required_items") as string || null,
      rules: formData.get("rules") as string || null,
      tips: formData.get("tips") as string || null,
      imageUrl: formData.get("image_url") as string || null,
      prefecture: formData.get("prefecture") as string || null,
      organization: formData.get("poster_name") as string || "匿名",
      published: true // 投稿時に自動的に公開状態にする
    };

    const post = await prisma.post.create({
      data,
      include: {
        user: {
          select: {
            displayName: true,
            organization: true
          }
        }
      }
    });

    return json({ success: true, post });
  } catch (error) {
    console.error("Error creating post:", error);
    return json({ error: "投稿の作成に失敗しました" }, { status: 500 });
  }
};