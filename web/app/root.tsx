import type { LinksFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse
} from "@remix-run/react";

import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "./components/molecules/Breadcrumb";
import { WindowSize } from "./components/atoms/WindowSize";
import MainContent from "./components/organisms/MainContent";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import { getUser } from "./session.server";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await getUser(request);
    return Response.json({ 
      isLoggedIn: !!user, 
      user: user ? {
        id: user.id,
        email: user.email,
        displayName: user.displayName
      } : null
    });
  } catch (error) {
    console.error("Error loading user:", error);
    // エラー時はログインしていないものとして処理
    return Response.json({ 
      isLoggedIn: false, 
      user: null
    });
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  // エラー境界の場合はuseLoaderDataが使えないため、デフォルト値を使用
  let isLoggedIn = false;
  
  try {
    const data = useLoaderData<typeof loader>();
    isLoggedIn = data?.isLoggedIn || false;
  } catch (error) {
    // 開発環境ではエラーを表示
    if (process.env.NODE_ENV === 'development') {
      console.error('Layout useLoaderData error:', error);
    }
    // エラー時はログインしていないものとして扱う
    isLoggedIn = false;
  }

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <Header isLoggedIn={isLoggedIn} />
          <MainContent>
            {children}
            <Breadcrumb />
          </MainContent>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <WindowSize />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // 開発環境では詳細なエラー情報を表示
  if (process.env.NODE_ENV === 'development') {
    console.error('ErrorBoundary caught:', error);
    
    return (
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <div className="min-h-screen p-8 bg-red-50">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-red-900 mb-4">Development Error</h1>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  {isRouteErrorResponse(error) ? (
                    `${error.status} - ${error.statusText}`
                  ) : (
                    error instanceof Error ? error.message : "Unknown Error"
                  )}
                </h2>
                {error instanceof Error && (
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto mb-4">
                    {error.stack}
                  </pre>
                )}
                {isRouteErrorResponse(error) && (
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(error.data, null, 2)}
                  </pre>
                )}
              </div>
              <a 
                href="/" 
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
              >
                ホームに戻る
              </a>
            </div>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }

  // 本番環境では簡潔なエラーページ
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {isRouteErrorResponse(error) ? (
                `${error.status} - ${error.statusText}`
              ) : (
                "エラーが発生しました"
              )}
            </h1>
            <p className="text-gray-600 mb-4">
              {isRouteErrorResponse(error) ? (
                error.data
              ) : (
                "予期しないエラーが発生しました。しばらく時間をおいてから再度お試しください。"
              )}
            </p>
            <a 
              href="/" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
            >
              ホームに戻る
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Outlet />
    </>
  );
}
