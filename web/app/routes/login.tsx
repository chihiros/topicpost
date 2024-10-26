import { BsFacebook, BsGithub, BsTwitterX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BreadcrumbHandle } from "../components/breadcrumb/Breadcrumb";
import { SocialLoginButton, SocialLoginProps } from "../components/login/SocialLoginButton";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "ログイン"
  })
};

export default function Login() {
  return (
    <>
      <div className="relative bg-white rounded-lg shadow">
        <div className="px-6 py-6 max-w-3xl mx-auto">
          <h3 className="mb-4 text-xl font-medium text-gray-900">TopicPost にログインする</h3>
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
              {/* <EmailPassword toggle={toggle} /> */}
            </div>
          </div>
          {/* プライバシーポリシーへのリンクを貼る */}
          dasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasds
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
