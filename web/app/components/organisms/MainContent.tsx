import type { ReactNode } from "react";
import { useLocation } from "@remix-run/react";

type MainContentProps = {
  children: ReactNode;
};

export default function MainContent({ children }: MainContentProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="lg:ml-64 break-all pt-16 lg:pt-0">
      {children}
    </div>
  );
}
