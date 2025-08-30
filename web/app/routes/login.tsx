import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { BsFacebook, BsGithub, BsTwitterX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Text from "../components/atoms/InputTest";
import Label from "../components/atoms/Label";
import { SocialLoginButton, SocialLoginProps } from "../components/molecules/SocialLoginButton";
import { SupabaseLoginWithPassword } from "../services/supabase/auth.supabase.server";
import LoginModal from "../components/organisms/LoginModal";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/";
  
  // ページタイトルを決定
  let pageTitle = "ログインが必要です";
  if (redirectTo.includes("/mypage")) {
    pageTitle = "マイページにはログインが必要です";
  } else if (redirectTo.includes("/recreation/new")) {
    pageTitle = "レクリエーション投稿にはログインが必要です";
  } else if (redirectTo.includes("/profile")) {
    pageTitle = "プロフィールページにはログインが必要です";
  }
  
  return Response.json({ redirectTo, pageTitle });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);

  const _email = form.LoginEmail.toString();
  const _password = form.LoginPassword.toString();
  const redirectTo = form.redirectTo?.toString() || "/";

  try {
    const res = await SupabaseLoginWithPassword(request, _email, _password);
    console.log(res.headers);
    
    // Remix fetcherからのリクエストかどうか判定
    const accept = request.headers.get("accept");
    const isFetcherRequest = accept?.includes("*/*") && !accept.includes("text/html");
    
    if (isFetcherRequest) {
      // fetcherからのリクエスト - JSONレスポンスを返す
      return Response.json({ success: true, redirectTo }, { headers: res.headers });
    }
    
    // 通常のページ遷移
    return redirect(redirectTo, { headers: res.headers });
  } catch (error) {
    return Response.json({ error: error });
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const { redirectTo, pageTitle } = useLoaderData<typeof loader>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ページ読み込み時にモーダルを自動で開く
  useEffect(() => {
    if (redirectTo !== "/") {
      setIsModalOpen(true);
    }
  }, [redirectTo]);

  const getPageDescription = () => {
    if (redirectTo.includes("/mypage")) {
      return "マイページにアクセスするには、ログインが必要です。アカウントをお持ちでない場合は、新規登録をお願いします。";
    } else if (redirectTo.includes("/recreation/new")) {
      return "レクリエーションを投稿するには、ログインが必要です。投稿後は他のユーザーと情報共有できます。";
    } else if (redirectTo.includes("/profile")) {
      return "プロフィール設定にアクセスするには、ログインが必要です。";
    }
    return "このページにアクセスするには、ログインが必要です。";
  };

  return (
    <>
      <div className="-m-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
            {/* ヘッダー */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1a2 2 0 002 2zM8 7a4 4 0 118 0c0 1-1 1-1 1s0-1 0-1-1 0-1 0S8 8 8 7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{pageTitle}</h1>
              <p className="text-gray-600 text-lg">{getPageDescription()}</p>
            </div>
            
            {/* メイン案内 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-blue-900 font-semibold mb-2">モーダルでかんたんログイン</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    下のボタンからログインモーダルを開けます。<br />
                    より素早く、使いやすい方法でログインできます。
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>ログインモーダルを開く</span>
                  </button>
                </div>
              </div>
            </div>

            {/* その他のアクション */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-4">または、下記から選択してください：</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/"
                  className="flex items-center justify-center space-x-2 py-3 px-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>ホームページ</span>
                </Link>
                
                <Link
                  to="/signup"
                  className="flex items-center justify-center space-x-2 py-3 px-4 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>新規アカウント作成</span>
                </Link>
              </div>
            </div>

            {/* フッター情報 */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                TopicPost - 全国の子ども会活動を支援するプラットフォーム
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ログインモーダル */}
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        redirectTo={redirectTo}
      />
    </>
  );
}

const SocialLogins: SocialLoginProps[] = [
  {
    icon: <FcGoogle size={24} />,
    children: "Googleでログイン",
    onClick: () => {
      // SupabaseSignInWithProvider("google");
    }
  }, {
    icon: <BsGithub size={20} color="#333" />,
    children: "GitHubでログイン",
    onClick: () => {
      // SupabaseSignInWithProvider("github");
    }
  }, {
    icon: <BsTwitterX size={20} color="#0F1419" />,
    children: "Xでログイン",
    onClick: () => {
      // SupabaseSignInWithProvider("twitter");
    }
  }, {
    icon: <BsFacebook size={20} color="#4267B2" />,
    children: "Facebookでログイン",
    onClick: () => {
      // SupabaseSignInWithProvider("facebook");
    }
  }
];
