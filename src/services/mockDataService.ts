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

const API_BASE = 'https://svnmczgmurkwxxozrgfk.supabase.co/functions/v1/api';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const getStats = (): Promise<StatCardData[]> => fetchApi('stats');
export const getOrderSummary = (): Promise<OrderSummaryItem[]> => fetchApi('order-summary');
export const getOverview = (): Promise<OverviewSlice[]> => fetchApi('overview');
export const getTopSelling = (): Promise<TopSellingItem[]> => fetchApi('top-selling');
export const getCustomerMap = (): Promise<CustomerMapEntry[]> => fetchApi('customer-map');
export const getRevenue = (): Promise<RevenueEntry[]> => fetchApi('revenue');
export const getOrders = (): Promise<Order[]> => fetchApi('orders');
export const getCustomers = (): Promise<Customer[]> => fetchApi('customers');
export const getChatUsers = (): Promise<ChatUser[]> => fetchApi('chat-users');
export const getChatMessages = (chatId: string): Promise<ChatMessage[]> =>
  fetchApi(`chat-messages?conversationId=${chatId}`);

export async function sendChatMessage(conversationId: string, text: string): Promise<ChatMessage> {
  const res = await fetch(`${API_BASE}/chat-messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, text }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
