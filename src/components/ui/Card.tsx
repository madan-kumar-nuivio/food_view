interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export default function Card({ title, children, className = '', action }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-base font-semibold text-gray-800">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
