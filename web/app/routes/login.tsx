import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { BsFacebook, BsGithub, BsTwitterX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Text from "../components/atoms/InputTest";
import Label from "../components/atoms/Label";
import { BreadcrumbHandle } from "../components/molecules/Breadcrumb";
import { SocialLoginButton, SocialLoginProps } from "../components/molecules/SocialLoginButton";
import { SupabaseLoginWithPassword } from "../services/supabase/auth.supabase.server";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "ログイン"
  })
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);

  const _email = form.LoginEmail.toString();
  const _password = form.LoginPassword.toString();

  try {
    const res = await SupabaseLoginWithPassword(request, _email, _password);
    console.log(res.headers);
    return redirect("/", { headers: res.headers });
  } catch (error) {
    return Response.json({ error: error });
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <>
      <div className="relative bg-white rounded-lg shadow">
        <div className="px-6 py-6 max-w-3xl mx-auto">
          <div className="mb-5 text-2xl text-gray-900">TopicPost にログインする</div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* 左側にはSSOログインを設定する */}
            <div className="flex flex-col justify-center space-y-2 sm:space-y-4 sm:pr-6">
              {SocialLogins.map((social, index) => (
                <SocialLoginButton key={index} {...social} />
              ))}
            </div>
            {/* 右側にはEmail/Passwordのログインを設定する */}
            <hr className="h-px my-4 bg-gray-200 border-0 sm:hidden" />
            <div className="h-auto max-w-full sm:border-l-2 sm:pl-6">
              <Form className="space-y-6" method="post">
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
                {actionData?.error && (
                  <div className="text-red-500 text-xs">
                    ログインに失敗しました<br />入力したメールアドレス、パスワードの確認してください
                  </div>
                )}
                <div className="flex justify-end">
                  <Link
                    to="/login/forget"
                    className="text-sm text-blue-700 hover:underline"
                    prefetch="intent"
                  >
                    パスワードを忘れましたか？
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  ログイン
                </button>
                <div className="text-sm font-medium text-gray-500">
                  <Link
                    to="/signup"
                    className="text-blue-700 hover:underline"
                    prefetch="intent"
                  >
                    TopicPostのアカウントを作成する
                  </Link>
                </div>
              </Form>
            </div>
          </div>
          {/* プライバシーポリシーへのリンクを貼る */}
          {/* <hr className="h-px my-4 bg-gray-200 border-0" />
          <div className="flex items-center">
            <Link
              to="/privacy"
              className="text-sm text-gray-700 hover:underline  mx-auto"
            >
              プライバシーポリシーはこちらをご覧ください
            </Link>
          </div> */}
        </div>
      </div >
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
