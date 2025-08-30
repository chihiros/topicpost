import { Form, useFetcher } from "@remix-run/react";
import { BsFacebook, BsGithub, BsTwitterX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import Text from "../atoms/InputTest";
import Label from "../atoms/Label";
import { SocialLoginButton, SocialLoginProps } from "../molecules/SocialLoginButton";
import Modal from "../molecules/Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

const SocialLogins: SocialLoginProps[] = [
  {
    icon: <FcGoogle size={24} />,
    children: "Googleでログイン",
    onClick: () => {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/auth/google';
      document.body.appendChild(form);
      form.submit();
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

export default function LoginModal({ isOpen, onClose, redirectTo = "/" }: LoginModalProps) {
  const fetcher = useFetcher();

  // Remixのfetcher機能を使用してログイン成功時にモーダルを閉じる
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        // ログイン成功時
        onClose();
        // ページをリロードしてログイン状態を反映
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    }
  }, [fetcher.state, fetcher.data, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="px-8 py-10 sm:px-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TopicPost にログイン</h1>
          <p className="text-gray-600">全国の子ども会活動コミュニティへようこそ</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ソーシャルログイン */}
          <div className="order-2 lg:order-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">ソーシャルアカウントでログイン</h2>
            <div className="space-y-3">
              {SocialLogins.map((social, index) => (
                <SocialLoginButton key={index} {...social} />
              ))}
            </div>
          </div>
          
          {/* 区切り線 */}
          <div className="order-1 lg:order-2 lg:hidden">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">または</span>
              </div>
            </div>
          </div>
          
          {/* メール/パスワードログイン */}
          <div className="order-3 lg:order-2">
            <div className="lg:border-l lg:pl-12">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">メールアドレスでログイン</h2>
              <fetcher.Form className="space-y-5" method="post" action="/login">
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <div>
                  <Label htmlFor="LoginEmail">メールアドレス</Label>
                  <Text
                    type="email"
                    name="LoginEmail"
                    placeholder="example@topicpost.net"
                    required={true}
                    defaultValue={`example@example.com`}
                  />
                </div>
                <div>
                  <Label htmlFor="LoginPassword">パスワード</Label>
                  <Text
                    type="password"
                    name="LoginPassword"
                    placeholder="••••••••"
                    required={true}
                    defaultValue={`password`}
                  />
                </div>
                
                {fetcher.data?.error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    ログインに失敗しました。<br />
                    メールアドレスとパスワードを確認してください。
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    パスワードを忘れましたか？
                  </button>
                </div>
                
                <button
                  type="submit"
                  disabled={fetcher.state === "submitting"}
                  className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {fetcher.state === "submitting" ? "ログイン中..." : "ログイン"}
                </button>
              </fetcher.Form>
            </div>
          </div>
        </div>
        
        {/* アカウント作成リンク */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            アカウントをお持ちでない方は
            <button
              onClick={() => {
                onClose();
                // サインアップモーダルを開くか、ページに移動
                window.location.href = '/signup';
              }}
              className="ml-1 text-blue-600 hover:text-blue-700 hover:underline font-medium"
            >
              新規登録
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}