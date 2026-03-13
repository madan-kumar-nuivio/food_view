import { Bell, Mail, Settings, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/orders': 'Orders',
  '/chats': 'Chats',
  '/analytics': 'Analytics',
  '/customer': 'Customer',
  '/reviews': 'Reviews',
  '/wallet': 'Wallet',
};

export default function TopHeader() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';
  const { toggleSidebar } = useStore();

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
          <Mail size={18} className="text-gray-600" />
        </button>
        <button className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
          <Settings size={18} className="text-gray-600" />
        </button>
        <div className="w-px h-8 bg-gray-200 mx-1" />
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=7C3AED&color=fff"
            alt="Admin"
            className="w-9 h-9 rounded-full"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">admin@craveat.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
