import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import Text from "../components/atoms/InputTest";
import Label from "../components/atoms/Label";
import { BreadcrumbHandle } from "../components/breadcrumb/Breadcrumb";
import { userApi } from "../services/openapi";
import { UserRequest, UserResponse } from "../services/openapi/generated";
import { SupabaseSignUp } from "../services/supabase/Supabase";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "サインアップ"
  })
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);

  const _email = form.email.toString();
  const _emailConfirm = form.emailConfirm.toString();
  const _password = form.password.toString();

  // もし、emailとemailConfirmが一致していない場合はエラーを返す
  if (_email !== _emailConfirm) {
    return new Response("メールアドレスとメールアドレス(確認用)が一致しません", {
      status: 400,
    });
  }

  // パスワードが8文字以下で数字だけ、またはアルファベットだけの場合はエラーを返す
  if (
    _password.length < 8 || _password.length > 64
    || /^[0-9]*$/.test(_password)
    // || /^[a-zA-Z]*$/.test(_password)
  ) {
    return new Response("パスワードは8文字以上64文字以下で入力してください", {
      status: 400,
    });
  }

  const { data, error } = await SupabaseSignUp(_email, _password);
  if (error) {
    console.log({ error });

    return new Response("サインアップに失敗しました", {
      status: 400,
    });
  }

  const res = await userApi.usersPost({
    uid: data?.user?.id ?? "",
  } as UserRequest);
  const userResponse: UserResponse = res.data;
  console.log({ userResponse });

  return redirect(request.headers.get("Referer") ?? "/");
}

export default function Login() {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex mb-5 text-3xl">新規アカウントの登録</div>
      <Form method="post">
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-12 sm:col-span-6">
            <Label htmlFor="email" required>
              メールアドレス
            </Label>
            <Text
              id="email"
              type="email"
              name="email"
              className="bg-gray-50"
              required={true}
              defaultValue={`example@example.com`}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Label htmlFor="emailConfirm" required>
              メールアドレス(確認用)
            </Label>
            <Text
              id="emailConfirm"
              type="email"
              name="emailConfirm"
              className="bg-gray-50"
              required={true}
              defaultValue={`example@example.com`}
            />
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="password" required>
            パスワード
          </Label>
          <Text
            id="password"
            type="password"
            name="password"
            className="bg-gray-50"
            placeholder=""
            required={true}
            defaultValue={`password`}
          />
          <div className="text-gray-500 text-sm mt-2">パスワードは8文字以上64文字以下で入力してください<br />半角英数と記号が利用できます</div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-1/2 py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >送信</button>
        </div>
      </Form>
    </div>
  );
}
