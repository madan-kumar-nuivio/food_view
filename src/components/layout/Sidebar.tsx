import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Users,
  Star,
  Wallet,
  LogOut,
  UtensilsCrossed,
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/customer', icon: Users, label: 'Customer' },
  { to: '/reviews', icon: Star, label: 'Reviews' },
  { to: '/chats', icon: MessageSquare, label: 'Chats' },
  { to: '/wallet', icon: Wallet, label: 'Wallet' },
];

export default function Sidebar() {
  const { sidebarOpen } = useStore();

  return (
    <aside
      className={`${
        sidebarOpen ? 'w-60' : 'w-20'
      } bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 transition-all duration-300 shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
          <UtensilsCrossed size={20} className="text-white" />
        </div>
        {sidebarOpen && (
          <span className="text-lg font-bold text-gray-800 tracking-tight">CRAVEAT</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-lightest text-primary border-l-4 border-primary'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`
            }
          >
            <item.icon size={20} />
            {sidebarOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full transition-colors">
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
