import { Link, NavLink } from "@remix-run/react";
import type { EmojiEntity } from "@twemoji/parser";
import { parse } from "@twemoji/parser";
import { useState } from "react";
import SidebarLogin from "./SidebarLogin";
import SidebarUserInfo from "./SidebarUserInfo";

type SidebarMenu = {
  icon: string;
  label: string;
  link: string;
}

const SIDEBAR_MENUS: SidebarMenu[] = [
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

export default function Sidebar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* モバイル用ヘッダー (サイドバーが隠れているときのみ表示) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-30 h-16 flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          TopicPost
        </Link>
        <button
          onClick={toggleSidebar}
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-none"
          aria-controls="logo-sidebar"
          aria-expanded={isOpen}
        >
          <span className="sr-only">メニューを開く</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </div>

      {/* オーバーレイ (SP版でサイドバーが開いているときのみ表示) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* サイドバー */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 w-64 h-screen shadow transition-transform z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
      <div className="h-full py-4 overflow-y-auto bg-gray-50">
        <Link to="/" prefetch="intent" className="flex justify-center pt-2 pb-4" onClick={closeSidebar}>
          <span className="text-3xl font-semibold hover:text-gray-400">TopicPost</span>
        </Link>

        {isLoggedIn ? (
          <SidebarUserInfo />
        ) : (
          <SidebarLogin onCloseSidebar={closeSidebar} />
        )}

        <nav>
          <ul>
            {SIDEBAR_MENUS.map((menu, index) => (
              <NavLink
                to={menu.link}
                key={index}
                prefetch="intent"
                onClick={closeSidebar}
              >
                <li className="flex p-3 h-17 border-b-2 hover:bg-gray-100 items-center">
                  <div className="flex rounded-md w-10 h-10">
                    <EmojiImage emoji={menu.icon} />
                  </div>
                  <span className="ml-4 text-lg text-gray-500 font-semibold">
                    {menu.label}
                  </span>
                </li>
              </NavLink>
            ))}
            {isLoggedIn && (
              <button
                className="flex p-3 h-17 border-b-2 hover:bg-gray-100 items-center"
                onClick={async () => {
                  closeSidebar();
                  try {
                    const response = await fetch("/logout", {
                      method: "POST"
                    });
                    if (!response.ok) {
                      throw new Error("Failed to logout");
                    }
                    window.location.href = "/";
                  } catch (error) {
                    console.error("Failed to logout", error);
                  }
                }}
              >
                <div className="flex rounded-md w-10 h-10">
                  <EmojiImage emoji="👉" />
                </div>
                <span className="ml-4 text-lg text-gray-500 font-semibold">
                  ログアウト
                </span>
              </button>
            )}
          </ul>
        </nav>
        <Footer />
      </div>
    </aside>
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-0 w-full p-4">
      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- Contributors, come join us here! https://github.com/chihiros/topicpost-api -->`
        }}
      />
      <Link
        to="https://github.com/chihiros"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-300"
      >
        <p>
          Powered by {"chihiros"}
        </p>
      </Link>
    </footer>
  );
}

function EmojiImage({ emoji }: { emoji: string }) {
  try {
    const emojiEntity = convertEmojiStrToTwiImage(emoji);
    return (
      <img
        className="w-10 h-10"
        src={emojiEntity.url}
        alt={emoji}
        aria-hidden="true"
      />
    );
  } catch (e) {
    console.error('Emoji conversion failed:', e);
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
