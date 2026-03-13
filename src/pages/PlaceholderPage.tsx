import { Construction } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
  '/analytics': 'Analytics',
  '/customer': 'Customer',
  '/reviews': 'Reviews',
  '/wallet': 'Wallet',
};

export default function PlaceholderPage() {
  const location = useLocation();
  const title = titles[location.pathname] || 'Page';

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="w-16 h-16 bg-primary-lightest rounded-2xl flex items-center justify-center">
        <Construction size={32} className="text-primary" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500">Coming Soon</p>
    </div>
  );
}
