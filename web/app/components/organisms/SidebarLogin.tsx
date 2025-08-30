import { Link } from "@remix-run/react";

interface SidebarLoginProps {
  onCloseSidebar: () => void;
}

export default function SidebarLogin({ onCloseSidebar }: SidebarLoginProps) {
  return (
    <Link to="/login" onClick={onCloseSidebar}>
      <div
        className="flex flex-col items-center justify-center hover:bg-gray-100 rounded-lg p-4 transition-colors duration-200 shadow-sm"
      >
        <div className="flex bg-gray-200 w-10 h-10 mx-auto p-2 mb-2 rounded-full">
          <svg width="20" height="20" viewBox="0 0 1453 1254" fill="#577381" xmlns="http://www.w3.org/2000/svg">
            <rect y="329" width="472" height="93" rx="36" fill="" />
            <rect x="283" y="140" width="472" height="93" rx="46.5" transform="rotate(90 283 140)" fill="" />
            <ellipse cx="876.5" cy="258" rx="258.5" ry="258" fill="" />
            <path d="M1453 1036.82C1453 1251.56 1194.67 1254 876 1254C557.332 1254 299 1251.56 299 1036.82C299 822.079 557.332 648 876 648C1194.67 648 1453 822.079 1453 1036.82Z" fill="" />
          </svg>
        </div>
        <div className="text-xs font-medium text-gray-600 text-center">新規登録／ログイン</div>
      </div>
    </Link>
  );
}
