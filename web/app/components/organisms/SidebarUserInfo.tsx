import { useLoaderData } from "@remix-run/react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "おはようございます ☀️";
  if (hour < 18) return "こんにちは 😊";
  return "こんばんは 🌙";
};

const getInitials = (displayName: string) => {
  const names = displayName.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

const getAvatarColor = (userId: string) => {
  // ユーザーIDに基づいて一意の色を生成
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
    'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-cyan-500'
  ];
  const index = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

export default function SidebarUserInfo() {
  return null;
}
