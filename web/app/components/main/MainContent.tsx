import type { ReactNode } from "react";

type MainContentProps = {
  children: ReactNode;
};

export default function MainContent({ children }: MainContentProps) {
  return (
    <div className="p-3 lg:ml-64 break-all">
      {children}
    </div>
  );
}
