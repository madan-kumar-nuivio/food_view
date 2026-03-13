import {
  ShoppingBag,
  CheckCircle,
  XCircle,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import type { StatCardData } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  CheckCircle,
  XCircle,
  DollarSign,
  Clock,
};

const iconBgMap: Record<string, string> = {
  ShoppingBag: 'bg-violet-100 text-violet-600',
  CheckCircle: 'bg-emerald-100 text-emerald-600',
  XCircle: 'bg-red-100 text-red-600',
  DollarSign: 'bg-blue-100 text-blue-600',
  Clock: 'bg-amber-100 text-amber-600',
};

export default function StatCard({ data }: { data: StatCardData }) {
  const Icon = iconMap[data.icon] || ShoppingBag;
  const bgClass = iconBgMap[data.icon] || 'bg-violet-100 text-violet-600';

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgClass}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{data.value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{data.label}</p>
      </div>
      {data.trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${data.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
          {data.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {data.trend} from yesterday
        </div>
      )}
    </div>
  );
}
