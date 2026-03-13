import type { OrderStatus } from '../../types';

const variants: Record<OrderStatus, { bg: string; text: string; dot: string }> = {
  Delivered: { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  'On Delivery': { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
  Cancelled: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
};

export default function Badge({ status }: { status: OrderStatus }) {
  const v = variants[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${v.bg} ${v.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
      {status}
    </span>
  );
}
