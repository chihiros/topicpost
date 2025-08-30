import React, { type ReactNode } from 'react';

export interface SocialLoginProps {
  icon: ReactNode;
  children: string;
  onClick?: () => void;
}

export const SocialLoginButton: React.FC<SocialLoginProps> = ({
  icon,
  children,
  onClick
}) => {
  return (
    <button
      className="group w-full px-4 py-3 border border-gray-300 rounded-lg duration-300
                hover:border-blue-400 hover:bg-blue-50 active:bg-blue-100 
                flex items-center justify-center space-x-3"
      onClick={onClick}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="font-medium text-gray-700 duration-300 group-hover:text-blue-600">
        {children}
      </span>
    </button>
  );
}
