export interface StatCardData {
  id: string;
  label: string;
  value: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

export interface OrderSummaryItem {
  label: string;
  value: number;
  total: number;
  color: string;
}

export interface OverviewSlice {
  name: string;
  value: number;
  color: string;
}

export interface TopSellingItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface CustomerMapEntry {
  day: string;
  thisWeek: number;
  lastWeek: number;
}

export interface RevenueEntry {
  month: string;
  revenue: number;
}

export type OrderStatus = 'Delivered' | 'On Delivery' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  avatar: string;
  payment: string;
  location: string;
  status: OrderStatus;
  contact: string;
}

export type CustomerStatus = 'Active' | 'Inactive' | 'New';

export interface Customer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: string;
  status: CustomerStatus;
  joinDate: string;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isOwn: boolean;
}
