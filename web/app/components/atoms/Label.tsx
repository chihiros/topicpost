type LabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
};

export default function Label({ htmlFor, children, className, required }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`block mb-2 text-sm font-medium text-gray-900 ${className}`}>
      {children}{required && <sup className="text-red-500">*必須</sup>}
    </label>
  );
}
