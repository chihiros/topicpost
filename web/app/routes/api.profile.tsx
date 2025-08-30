import { ActionFunctionArgs, json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

// GET: プロフィール取得
export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const requestedUserId = url.searchParams.get("userId");
  
  // 認証されたユーザーを取得
  const authUser = await getUser(request);
  if (!authUser) {
    return json({ error: "認証が必要です" }, { status: 401 });
  }

  // 自分のプロフィールのみアクセス可能
  const userId = requestedUserId === authUser.id ? requestedUserId : authUser.id;
  
  try {
    let profile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true }
    });

    if (!profile) {
      // プロフィールが存在しない場合は、認証ユーザー情報から作成
      let user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        // ユーザーが存在しない場合は作成
        user = await prisma.user.create({
          data: {
            id: userId,
            email: authUser.email,
            displayName: authUser.displayName,
            interests: []
          }
        });
      }
      
      profile = await prisma.profile.create({
        data: {
          userId: user.id,
          displayName: user.displayName,
          interests: user.interests || []
        },
        include: { user: true }
      });
    }

    return json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return json({ error: "プロフィールの取得に失敗しました" }, { status: 500 });
  }
};

// POST/PUT: プロフィール更新
export const action = async ({ request }: ActionFunctionArgs) => {
  // 認証されたユーザーを取得
  const authUser = await getUser(request);
  if (!authUser) {
    return json({ error: "認証が必要です" }, { status: 401 });
  }

  const formData = await request.formData();
  const userId = formData.get("userId") as string || authUser.id;

  // 自分のプロフィールのみ更新可能
  if (userId !== authUser.id) {
    return json({ error: "権限がありません" }, { status: 403 });
  }
  
  try {
    const data = {
      displayName: formData.get("displayName") as string,
      prefecture: formData.get("prefecture") as string || null,
      city: formData.get("city") as string || null,
      organization: formData.get("organization") as string || null,
      role: formData.get("role") as string || null,
      activityYears: formData.get("activityYears") ? parseInt(formData.get("activityYears") as string) : null,
      bio: formData.get("bio") as string || null,
      interests: formData.getAll("interests") as string[]
    };

    // プロフィールを更新または作成
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data
      }
    });

    // ユーザー情報も更新
    await prisma.user.update({
      where: { id: userId },
      data: {
        displayName: data.displayName,
        prefecture: data.prefecture,
        city: data.city,
        organization: data.organization,
        role: data.role,
        activityYears: data.activityYears,
        bio: data.bio,
        interests: data.interests
      }
    });

    return json({ success: true, profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return json({ error: "プロフィールの更新に失敗しました" }, { status: 500 });
  }
};