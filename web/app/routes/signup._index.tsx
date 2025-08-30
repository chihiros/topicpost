import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import Text from "../components/atoms/InputTest";
import Label from "../components/atoms/Label";
import { SupabaseSignUp } from "../services/supabase/auth.supabase.server";

const validateForm = (email: string, emailConfirm: string, password: string) => {
  const message: string[] = [];

  if (email !== emailConfirm) {
    message.push("メールアドレスが一致しません");
  }

  if (password.length < 8 || password.length > 64) {
    message.push("パスワードは8文字以上64文字以下で入力してください");
  }

  // if (/^[0-9]*$/.test(password) || /^[a-zA-Z]*$/.test(password)) {
  //   message.push("パスワードは半角英数と記号が利用できます");
  // }

  if (message.length > 0) {
    return message;
  }
}

type FormData = {
  email: string;
  emailConfirm: string;
  password: string;
};

export async function action({ request }: ActionFunctionArgs) {
  const fd = await request.formData();
  const form = Object.fromEntries(fd);

  const formData: FormData = {
    email: form.email.toString(),
    emailConfirm: form.emailConfirm.toString(),
    password: form.password.toString(),
  };

  const message = validateForm(formData.email, formData.emailConfirm, formData.password);

  if (message) {
    return Response.json({ error: message, inputValue: formData });
  }

  try {
    const result = await SupabaseSignUp(request, formData.email, formData.password);
    
    // サインアップ成功時、Supabaseのヘッダー（認証クッキー）を含めてリダイレクト
    return redirect("/signup/welcome", {
      headers: result.headers,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return Response.json({ 
      error: [error.message], 
      inputValue: formData 
    });
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-10 sm:px-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">TopicPost アカウント作成</h1>
              <p className="text-gray-600">子ども会活動の輪を広げよう</p>
            </div>
            
            <Form method="post" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" required>
                    メールアドレス
                  </Label>
                  <Text
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@topicpost.net"
                    required={true}
                    defaultValue={actionData?.inputValue?.email ?? ""}
                  />
                </div>
                <div>
                  <Label htmlFor="emailConfirm" required>
                    メールアドレス(確認用)
                  </Label>
                  <Text
                    id="emailConfirm"
                    type="email"
                    name="emailConfirm"
                    placeholder="example@topicpost.net"
                    required={true}
                    defaultValue={actionData?.inputValue?.emailConfirm ?? ""}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password" required>
                  パスワード
                </Label>
                <Text
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required={true}
                  defaultValue={actionData?.inputValue?.password ?? ""}
                />
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">パスワードの要件：</p>
                  <ul className="text-sm text-gray-500 list-disc list-inside ml-2">
                    <li>8文字以上64文字以下</li>
                    <li>半角英数と記号が利用可能</li>
                  </ul>
                </div>
              </div>
              
              {actionData?.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-red-600 text-sm font-medium mb-1">入力内容にエラーがあります</div>
                  {actionData.error.map((message: string, index: number) => (
                    <div key={index} className="text-red-600 text-sm flex items-start">
                      <span className="mr-2">•</span>
                      <span>{message}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-lg"
                >
                  アカウントを作成
                </button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">または</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    すでにアカウントをお持ちの方は
                    <Link
                      to="/login"
                      className="ml-1 text-blue-600 hover:text-blue-700 hover:underline font-medium"
                      prefetch="intent"
                    >
                      ログイン
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                アカウントを作成することで、TopicPostの
                <Link to="/terms" className="text-blue-600 hover:underline">利用規約</Link>
                および
                <Link to="/privacy" className="text-blue-600 hover:underline">プライバシーポリシー</Link>
                に同意したものとみなされます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
