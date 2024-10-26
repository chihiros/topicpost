import { BreadcrumbHandle } from "../components/breadcrumb/Breadcrumb";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "お問い合わせ"
  })
};

export default function Index() {
  const formId = "1FAIpQLSeE8CH-UcQv3r0CVmTxS4QQ8612Tzt4-F1Rj7OxeKiZD5FcQw";

  return (
    <div>
      <iframe
        src={`https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`}
        width="640"
        height="600"
        title="Contact Form"
      />
    </div >
  );
}
