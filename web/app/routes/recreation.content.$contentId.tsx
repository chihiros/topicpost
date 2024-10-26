import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { BreadcrumbHandle } from "../components/breadcrumb/Breadcrumb";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "ジョンブラウンのおじさん"
  })
};

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.contentId, `contentId is required`);
  return params.contentId;
};

export default function DetailContent() {
  const contentId = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Recreation Detail Content {contentId}</h1>
    </div>
  );
}
