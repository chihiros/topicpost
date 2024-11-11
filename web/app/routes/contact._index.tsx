import { json, useLoaderData } from "@remix-run/react";
import { BreadcrumbHandle } from "../components/breadcrumb/Breadcrumb";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "お問い合わせ"
  })
};

export const loader = async () => {
  const formId = process.env.CONTACT_GOOGLE_FORM_ID;

  return json({ formId: formId });
}

export default function Index() {
  const { formId } = useLoaderData<typeof loader>();

  return (
    <div>
      <iframe
        src={`https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`}
        width="640"
        height="600"
        title="Contact Form"
      />
    </div>
  );
}
