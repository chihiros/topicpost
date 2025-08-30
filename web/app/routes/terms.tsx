import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "利用規約 | TopicPost" },
    { name: "description", content: "TopicPostの利用規約をご確認ください。" },
  ];
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">利用規約</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第1条（適用）</h2>
              <p>
                本規約は、TopicPost（以下「当サービス」）の利用条件を定めるものです。
                登録ユーザーの皆さま（以下「ユーザー」）には、本規約に従って当サービスをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第2条（利用登録）</h2>
              <p>
                当サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、
                当社がこれを承認することによって、利用登録が完了するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第3条（禁止事項）</h2>
              <p className="mb-3">ユーザーは、当サービスの利用にあたり、以下の行為をしてはなりません。</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>他のユーザー、第三者または当社の知的財産権を侵害する行為</li>
                <li>他のユーザー、第三者または当社の名誉、信用を毀損または不当に差別若しくは誹謗中傷する行為</li>
                <li>他のユーザー、第三者または当社に不利益、損害、不快感を与える行為</li>
                <li>虚偽の情報を登録する行為</li>
                <li>営業、宣伝、広告、勧誘、その他営利を目的とする行為</li>
                <li>当サービスのネットワークまたはシステム等に過度な負荷をかける行為</li>
                <li>当サービスの運営を妨害するおそれのある行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第4条（本サービスの提供の停止等）</h2>
              <p>
                当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく
                本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-3">
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当社が本サービスの提供が困難と判断した場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第5条（利用制限および登録抹消）</h2>
              <p>
                当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、
                投稿データを削除し、当該ユーザーに対して本サービスの全部もしくは一部の利用を制限し、
                またはユーザーとしての登録を抹消することができるものとします。
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-3">
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>登録事項に虚偽の事実があることが判明した場合</li>
                <li>その他、当社が本サービスの利用を適当でないと判断した場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第6条（免責事項）</h2>
              <p>
                当社の債務不履行責任は、当社の故意または重過失によらない場合には免責されるものとします。
                当サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、
                連絡または紛争等について当社は一切責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第7条（サービス内容の変更等）</h2>
              <p>
                当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、
                これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第8条（利用規約の変更）</h2>
              <p>
                当社は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-3">
                <li>本規約の変更がユーザーの一般の利益に適合するとき。</li>
                <li>本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第9条（個人情報の取扱い）</h2>
              <p>
                当社は、本サービスの利用によって取得する個人情報については、
                当社「プライバシーポリシー」に従い適切に取り扱うものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">第10条（準拠法・裁判管轄）</h2>
              <p>
                本規約の解釈にあたっては、日本法を準拠法とします。
                本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
              </p>
            </section>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                制定日：2024年1月1日<br />
                最終改定日：2024年8月30日
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}