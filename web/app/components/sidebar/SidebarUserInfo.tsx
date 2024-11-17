// const comment = [
//   "さん、おはようございます🙂‍↕️",
//   "さん、こんにちは🙂‍↕️",
//   "さん、こんばんは🙂‍↕️",
// ];

export default function SidebarUserInfo() {
  return (
    <div className="flex flex-col items-center justify-center hover:bg-gray-100 rounded-md p-3 mx-3 h-24">
      <img
        src="https://placehold.jp/150x150.png"
        alt="ユーザーアイコン"
        className="rounded-full mb-3"
        width={48}
        height={48}
      />
      <div className="flex text-center text-sm text-slate-500">〇〇〇〇〇〇〇〇〇〇</div>
    </div>
  );
}
