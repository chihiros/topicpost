import { Link, NavLink } from "@remix-run/react";
import { useState } from "react";
import LoginModal from "./LoginModal";

type HeaderMenu = {
  label: string;
  link: string;
  description?: string;
  highlight?: boolean;
}

const HEADER_MENUS: HeaderMenu[] = [
  {
    label: "レクリエーション一覧",
    link: "/recreation",
    description: "投稿されたレクリエーションを見る"
  },
  {
    label: "新規投稿",
    link: "/recreation/new",
    description: "新しいレクリエーションを投稿",
    highlight: true
  },
  {
    label: "ヘルプ",
    link: "/help",
    description: "使い方とよくある質問"
  }
] as const;

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">T</span>
              </div>
              <span className="hidden sm:block">TopicPost</span>
            </Link>
          </div>

          {/* メインナビゲーション（デスクトップ） */}
          <nav className="hidden lg:flex items-center space-x-1">
            {HEADER_MENUS.map((menu, index) => {
              // ログインが必要なメニューをフィルタリング
              if (menu.link === "/recreation/new" && !isLoggedIn) {
                return null;
              }
              
              return (
                <NavLink
                  key={index}
                  to={menu.link}
                  prefetch="intent"
                  className={({ isActive }) =>
                    `group px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      menu.highlight && isLoggedIn
                        ? 'text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-sm'
                        : isActive
                          ? 'text-blue-600 bg-blue-50 border border-blue-100'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`
                  }
                >
                  <span>{menu.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* 右側のアクション */}
          <div className="flex items-center space-x-3">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>ログイン</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* ユーザーメニュー */}
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
                    onClick={toggleUserMenu}
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">U</span>
                    </div>
                    <span className="hidden sm:block">メニュー</span>
                    <svg className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* ドロップダウンメニュー */}
                  {isUserMenuOpen && (
                    <>
                      {/* オーバーレイ */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={closeUserMenu}
                      />
                      
                      {/* メニュー */}
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-20 border border-gray-100">
                        <div className="p-2" role="menu">
                          <div className="px-3 py-2 border-b border-gray-100 mb-2">
                            <p className="text-sm font-medium text-gray-900">アカウント</p>
                            <p className="text-xs text-gray-500">ログイン中</p>
                          </div>
                          
                          <NavLink
                            to="/mypage"
                            prefetch="intent"
                            onClick={closeUserMenu}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <div>
                              <p className="font-medium">マイページ</p>
                              <p className="text-xs text-gray-500">投稿履歴とプロフィール</p>
                            </div>
                          </NavLink>
                          
                          <NavLink
                            to="/recreation/new"
                            prefetch="intent"
                            onClick={closeUserMenu}
                            className="lg:hidden flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <div>
                              <p className="font-medium">新規投稿</p>
                              <p className="text-xs text-gray-500">レクリエーションを投稿</p>
                            </div>
                          </NavLink>
                          
                          <hr className="my-2" />
                          
                          <button
                            onClick={async () => {
                              closeUserMenu();
                              try {
                                const response = await fetch("/auth/logout", {
                                  method: "POST"
                                });
                                if (!response.ok) {
                                  throw new Error("Failed to logout");
                                }
                                window.location.href = "/";
                              } catch (error) {
                                console.error("Failed to logout", error);
                                window.location.href = "/";
                              }
                            }}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full text-left transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-medium">ログアウト</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {/* モバイルメニューボタン */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {HEADER_MENUS.map((menu, index) => {
                // ログインが必要なメニューをフィルタリング
                if (menu.link === "/recreation/new" && !isLoggedIn) {
                  return null;
                }
                
                return (
                  <NavLink
                    key={index}
                    to={menu.link}
                    prefetch="intent"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        menu.highlight && isLoggedIn
                          ? 'text-white bg-gradient-to-r from-blue-600 to-green-600 shadow-sm'
                          : isActive
                            ? 'text-blue-600 bg-blue-50 border border-blue-100'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    {menu.highlight && isLoggedIn ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    ) : menu.link === "/recreation" ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <div>
                      <p className="font-medium">{menu.label}</p>
                      {menu.description && (
                        <p className="text-xs text-gray-500 mt-0.5">{menu.description}</p>
                      )}
                    </div>
                  </NavLink>
                );
              })}
              
              {/* ログインしていない場合の追加メニュー */}
              {!isLoggedIn && (
                <div className="pt-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      setIsLoginModalOpen(true);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <div>
                      <p className="font-medium">ログイン</p>
                      <p className="text-xs text-blue-200">アカウントにサインイン</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ログインモーダル */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        redirectTo="/"
      />
    </header>
  );
}