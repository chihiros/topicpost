import { useState } from 'react';

type TextProps = {
  id?: string;
  type: string;
  name?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | null;
  defaultValue?: string;
};

export default function Text({
  id,
  type,
  name,
  className,
  placeholder,
  required,
  value,
  defaultValue
}: TextProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const icon = showPassword ? '🙈' : '🙉';

  return (
    <div className="relative">
      <input
        type={inputType}
        {...(id ? { id } : {})}
        {...(name ? { name } : {})}
        className={`border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${className}`}
        {...(placeholder ? { placeholder } : {})}
        {...(required ? { required } : {})}
        {...(value !== null ? { value } : {})}
        {...(defaultValue ? { defaultValue } : {})}
      />
      {type === 'password' && (
        <button
          type="button"
          className="absolute top-1/2 transform -translate-y-1/2 right-3"
          onClick={handleToggleShowPassword}
        >
          <span role="img" aria-label="Toggle password visibility" className='text-2xl'>
            {icon}
          </span>
        </button>
      )}
    </div>
  );
}
