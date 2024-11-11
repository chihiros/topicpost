import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "レクリエーション - TopicPost" },
  ];
};

export default function RecreationIndex() {
  return (
    <div>
      <h1>Recreation Index</h1>
    </div>
  );
}
