import { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import { getCustomers } from '../services/mockDataService';
import type { Customer } from '../types';

export default function Customers() {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers().then((data) => {
      setAllCustomers(data);
      setLoading(false);
    });
  }, []);

  const filtered = allCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Customer Details</h2>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email"
          className="w-56"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Customer</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Contact</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Location</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Orders</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Total Spent</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-50 hover:bg-violet-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-700 block">{customer.name}</span>
                          <span className="text-xs text-gray-400">{customer.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Mail size={13} className="text-primary" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Phone size={13} className="text-primary" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.location}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{customer.totalOrders}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{customer.totalSpent}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.joinDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No customers found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
