import { Link, NavLink } from "@remix-run/react";
import type { EmojiEntity } from "@twemoji/parser";
import { parse } from "@twemoji/parser";
import { useState } from "react";

type HeaderMenu = {
  icon: string;
  label: string;
  link: string;
}

const HEADER_MENUS: HeaderMenu[] = [
  {
    icon: "🏠",
    label: "レクリエーション",
    link: "/recreation"
  }, {
    icon: "📝",
    label: "お問い合わせ",
    link: "/contact"
  }
] as const;

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
            TopicPost
          </Link>

          {/* メインナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            {HEADER_MENUS.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.link}
                prefetch="intent"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <EmojiImage emoji={menu.icon} size="w-5 h-5" />
                <span>{menu.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* ユーザーアクション */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                prefetch="intent"
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <EmojiImage emoji="🔑" size="w-4 h-4" />
                <span>ログイン</span>
              </NavLink>
            ) : (
              <>
                {/* 新規投稿ボタン */}
                <NavLink
                  to="/recreation/new"
                  prefetch="intent"
                  className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <EmojiImage emoji="✨" size="w-4 h-4" />
                  <span>新規投稿</span>
                </NavLink>

                {/* ユーザーメニュードロップダウン */}
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={toggleUserMenu}
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <EmojiImage emoji="👤" size="w-5 h-5" />
                    </div>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1" role="menu">
                          <NavLink
                            to="/mypage"
                            prefetch="intent"
                            onClick={closeUserMenu}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <EmojiImage emoji="📚" size="w-4 h-4" />
                            <span>投稿履歴</span>
                          </NavLink>
                          <NavLink
                            to="/profile"
                            prefetch="intent"
                            onClick={closeUserMenu}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <EmojiImage emoji="👤" size="w-4 h-4" />
                            <span>プロフィール</span>
                          </NavLink>
                          <NavLink
                            to="/recreation/new"
                            prefetch="intent"
                            onClick={closeUserMenu}
                            className="md:hidden flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <EmojiImage emoji="✨" size="w-4 h-4" />
                            <span>新規投稿</span>
                          </NavLink>
                          <hr className="my-1" />
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
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            <EmojiImage emoji="👉" size="w-4 h-4" />
                            <span>ログアウト</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* モバイルナビゲーション */}
        <div className="md:hidden border-t border-gray-200 pt-2 pb-3 bg-white">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-2">
            {HEADER_MENUS.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.link}
                prefetch="intent"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors min-w-fit ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 border border-blue-200'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <EmojiImage emoji={menu.icon} size="w-4 h-4" />
                <span>{menu.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function EmojiImage({ emoji, size = "w-5 h-5" }: { emoji: string; size?: string }) {
  try {
    const emojiEntity = convertEmojiStrToTwiImage(emoji);
    return (
      <img
        className={size}
        src={emojiEntity.url}
        alt={emoji}
        aria-hidden="true"
      />
    );
  } catch (e) {
    console.error('Emoji conversion failed:', e);
    return null;
  }
}

const convertEmojiStrToTwiImage = (s: string): EmojiEntity => {
  const entities = parse(s);
  if (entities.length !== 1) {
    throw Error("1 emoji must be set");
  }
  const emojiEntity = entities[0];
  return emojiEntity;
};