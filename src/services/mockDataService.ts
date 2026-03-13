import data from '../assets/mockdata.json';
import type {
  StatCardData,
  OrderSummaryItem,
  OverviewSlice,
  TopSellingItem,
  CustomerMapEntry,
  RevenueEntry,
  Order,
  Customer,
  ChatUser,
  ChatMessage,
} from '../types';

export const getStats = (): StatCardData[] => data.stats;
export const getOrderSummary = (): OrderSummaryItem[] => data.orderSummary;
export const getOverview = (): OverviewSlice[] => data.overview;
export const getTopSelling = (): TopSellingItem[] => data.topSelling;
export const getCustomerMap = (): CustomerMapEntry[] => data.customerMap;
export const getRevenue = (): RevenueEntry[] => data.revenue;
export const getOrders = (): Order[] => data.orders as Order[];
export const getCustomers = (): Customer[] => data.customers as Customer[];
export const getChatUsers = (): ChatUser[] => data.chatUsers;
export const getChatMessages = (chatId: string): ChatMessage[] =>
  (data.chatMessages as Record<string, ChatMessage[]>)[chatId] || [];
