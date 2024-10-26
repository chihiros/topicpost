import { Outlet } from "@remix-run/react";
import { BreadcrumbHandle } from "../components/breadcrumb/Breadcrumb";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "コンテンツ詳細"
  })
};

export default function Content() {
  return (
    <Outlet />
  );
}
