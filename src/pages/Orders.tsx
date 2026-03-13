import { useState } from 'react';
import { Phone } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import Dropdown from '../components/ui/Dropdown';
import Badge from '../components/ui/Badge';
import { getOrders } from '../services/mockDataService';

export default function Orders() {
  const allOrders = getOrders();
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('Today');
  const [yearFilter, setYearFilter] = useState('2024');

  const filtered = allOrders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Order Details</h2>
        <div className="flex items-center gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name or ID"
            className="w-56"
          />
          <Dropdown
            value={dateFilter}
            options={['Today', 'This Week', 'This Month']}
            onChange={setDateFilter}
          />
          <Dropdown
            value={yearFilter}
            options={['2024', '2023', '2022']}
            onChange={setYearFilter}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Order ID</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Customer Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Payment</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Location</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Contact</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, idx) => (
                <tr
                  key={`${order.id}-${idx}`}
                  className="border-b border-gray-50 hover:bg-violet-50/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.avatar}
                        alt={order.customerName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-700">{order.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.payment}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.location}</td>
                  <td className="px-6 py-4">
                    <Badge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} className="text-primary" />
                      {order.contact}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No orders found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
