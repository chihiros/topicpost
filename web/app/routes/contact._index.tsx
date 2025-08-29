import { useLoaderData } from "@remix-run/react";
import { BreadcrumbHandle } from "../components/molecules/Breadcrumb";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "お問い合わせ"
  })
};

export const loader = async () => {
  const formId = process.env.CONTACT_GOOGLE_FORM_ID;

  return Response.json({ formId: formId });
}

export default function Index() {
  const { formId } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-2 py-2">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">お問い合わせ</h1>
            <p className="text-gray-600 mt-1">
              TopicPostに関するご質問やご要望がございましたら、こちらのフォームからお気軽にお問い合わせください。
            </p>
          </div>
          <div className="relative w-full" style={{ paddingBottom: '75%' }}>
            <iframe
              src={`https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`}
              className="absolute top-0 left-0 w-full h-full border-0"
              title="Contact Form"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
