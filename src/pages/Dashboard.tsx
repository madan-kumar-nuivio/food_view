import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import ProgressRing from '../components/charts/ProgressRing';
import DonutChart from '../components/charts/DonutChart';
import GroupedBarChart from '../components/charts/GroupedBarChart';
import RevenueAreaChart from '../components/charts/RevenueAreaChart';
import Dropdown from '../components/ui/Dropdown';
import {
  getStats,
  getOrderSummary,
  getOverview,
  getTopSelling,
  getCustomerMap,
  getRevenue,
} from '../services/mockDataService';
import { useState } from 'react';

export default function Dashboard() {
  const stats = getStats();
  const orderSummary = getOrderSummary();
  const overview = getOverview();
  const topSelling = getTopSelling();
  const customerMap = getCustomerMap();
  const revenue = getRevenue();
  const [period] = useState('This Week');

  return (
    <div className="space-y-6">
      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} data={stat} />
        ))}
      </div>

      {/* Row 2: Order Summary | Overview | Top Selling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Order Summary */}
        <Card title="Order Summary">
          <div className="space-y-5">
            {orderSummary.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <ProgressRing
                  value={item.value}
                  total={item.total}
                  color={item.color}
                  size={64}
                  strokeWidth={6}
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.value} of {item.total} orders</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Overview Donut */}
        <Card title="Overview">
          <DonutChart data={overview} />
          <div className="flex justify-center gap-4 mt-3">
            {overview.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}
              </div>
            ))}
          </div>
        </Card>

        {/* Top Selling */}
        <Card title="Top Selling">
          <div className="space-y-4">
            {topSelling.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-xl">
                  {item.image}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.price}</p>
                </div>
                <span className="text-xs font-medium text-gray-400">#{idx + 1}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 3: Customer Map | Total Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          title="Customer Map"
          action={
            <Dropdown
              value={period}
              options={['This Week', 'Last Week', 'This Month']}
              onChange={() => {}}
            />
          }
        >
          <GroupedBarChart data={customerMap} />
        </Card>

        <Card title="Total Revenue">
          <RevenueAreaChart data={revenue} />
        </Card>
      </div>
    </div>
  );
}
