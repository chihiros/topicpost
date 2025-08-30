import type { ReactNode } from "react";
import { useLocation } from "@remix-run/react";

type MainContentProps = {
  children: ReactNode;
};

export default function MainContent({ children }: MainContentProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="break-all pt-16 min-h-screen">
      {isHomePage ? (
        // ホームページは各セクションで個別にコンテナ制御
        children
      ) : (
        // その他のページは統一のコンテナ制御
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      )}
    </div>
  );
}
