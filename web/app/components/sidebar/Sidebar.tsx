import { Link, NavLink } from "@remix-run/react";
import type { EmojiEntity } from "@twemoji/parser";
import { parse } from "@twemoji/parser";
import SidebarLogin from "./SidebarLogin";

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

export default function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 w-64 h-screen shadow transition-transform -translate-x-full lg:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full py-4 overflow-y-auto bg-gray-50">
        <Link to="/" prefetch="intent" className="flex justify-center pt-2 pb-4">
          <span className="text-3xl font-semibold hover:text-gray-400">TopicPost</span>
        </Link>

        <SidebarLogin />

        <nav>
          <ul>
            {SIDEBAR_MENUS.map((menu, index) => (
              <NavLink
                to={menu.link}
                key={index}
                prefetch="intent"
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
          </ul>
        </nav>
        <Footer />
      </div>
    </aside >
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
