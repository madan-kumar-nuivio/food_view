import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

/**
 * CRAVEAT API — Single Edge Function with route-based dispatch.
 *
 * Endpoints:
 *   GET /api/stats           — Dashboard stat cards
 *   GET /api/order-summary   — Order summary (progress rings)
 *   GET /api/overview        — Overview slices (donut chart)
 *   GET /api/top-selling     — Top selling items
 *   GET /api/customer-map    — Weekly customer comparison
 *   GET /api/revenue         — Monthly revenue
 *   GET /api/orders          — Orders with customer info
 *   GET /api/customers       — Customer list
 *   GET /api/chat-users      — Chat user list
 *   GET /api/chat-messages?conversationId=<uuid> — Chat messages
 *   POST /api/chat-messages  — Send a new chat message
 */

function getSupabaseClient(req: Request) {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization") ?? "" },
      },
    }
  );
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function error(message: string, status = 400) {
  return json({ error: message }, status);
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  // Extract route: /api/stats → "stats", /api/chat-messages → "chat-messages"
  const pathParts = url.pathname.split("/").filter(Boolean);
  // pathParts = ["api", "stats"] or ["api", "chat-messages"]
  const route = pathParts.slice(1).join("/") || "";

  const supabase = getSupabaseClient(req);

  try {
    switch (route) {
      // ──────────────────────────────────────────
      // Dashboard endpoints
      // ──────────────────────────────────────────
      case "stats": {
        const { data, error: err } = await supabase
          .from("stat_cards")
          .select("stat_key, label, value, icon, trend, trend_up")
          .order("sort_order");
        if (err) throw err;
        // Map to frontend shape: { id, label, value, icon, trend?, trendUp? }
        const mapped = (data ?? []).map((r: Record<string, unknown>) => ({
          id: r.stat_key,
          label: r.label,
          value: r.value,
          icon: r.icon,
          trend: r.trend ?? undefined,
          trendUp: r.trend_up ?? undefined,
        }));
        return json(mapped);
      }

      case "order-summary": {
        const { data, error: err } = await supabase
          .from("order_summary")
          .select("label, value, total, color")
          .order("sort_order");
        if (err) throw err;
        return json(data);
      }

      case "overview": {
        const { data, error: err } = await supabase
          .from("overview_slices")
          .select("name, value, color")
          .order("sort_order");
        if (err) throw err;
        return json(data);
      }

      case "top-selling": {
        const { data, error: err } = await supabase
          .from("top_selling_items")
          .select("id, name, price, image")
          .order("sort_order");
        if (err) throw err;
        return json(data);
      }

      case "customer-map": {
        const { data, error: err } = await supabase
          .from("customer_map")
          .select("day, this_week, last_week")
          .order("sort_order");
        if (err) throw err;
        // Map to frontend shape: { day, thisWeek, lastWeek }
        const mapped = (data ?? []).map((r: Record<string, unknown>) => ({
          day: r.day,
          thisWeek: r.this_week,
          lastWeek: r.last_week,
        }));
        return json(mapped);
      }

      case "revenue": {
        const { data, error: err } = await supabase
          .from("revenue")
          .select("month, revenue")
          .order("sort_order");
        if (err) throw err;
        // Ensure revenue is a number
        const mapped = (data ?? []).map((r: Record<string, unknown>) => ({
          month: r.month,
          revenue: Number(r.revenue),
        }));
        return json(mapped);
      }

      // ──────────────────────────────────────────
      // Orders endpoint
      // ──────────────────────────────────────────
      case "orders": {
        const { data, error: err } = await supabase
          .from("orders_with_customer")
          .select("*");
        if (err) throw err;
        // Map to frontend shape
        const mapped = (data ?? []).map((r: Record<string, unknown>) => ({
          id: r.order_code,
          customerName: r.customer_name,
          avatar: r.customer_avatar,
          payment: r.payment,
          location: r.location,
          status: r.status,
          contact: r.contact,
        }));
        return json(mapped);
      }

      // ──────────────────────────────────────────
      // Customers endpoint
      // ──────────────────────────────────────────
      case "customers": {
        const { data, error: err } = await supabase
          .from("customers")
          .select("id, name, avatar, email, phone, location, total_orders, total_spent, status, join_date")
          .order("created_at");
        if (err) throw err;
        // Map to frontend shape
        const mapped = (data ?? []).map((r: Record<string, unknown>) => ({
          id: r.id,
          name: r.name,
          avatar: r.avatar,
          email: r.email,
          phone: r.phone,
          location: r.location,
          totalOrders: r.total_orders,
          totalSpent: `$${Number(r.total_spent).toFixed(2)}`,
          status: r.status,
          joinDate: r.join_date,
        }));
        return json(mapped);
      }

      // ──────────────────────────────────────────
      // Chat endpoints
      // ──────────────────────────────────────────
      case "chat-users": {
        const { data, error: err } = await supabase
          .from("chat_users_view")
          .select("*")
          .order("last_message_at", { ascending: false });
        if (err) throw err;
        // Map to frontend shape
        const mapped = (data ?? []).map((r: Record<string, unknown>) => ({
          id: r.id,
          name: r.name,
          avatar: r.avatar,
          lastMessage: r.last_message,
          time: formatRelativeTime(r.last_message_at as string),
          unread: Number(r.unread_count) || undefined,
          online: r.online || undefined,
        }));
        return json(mapped);
      }

      case "chat-messages": {
        if (req.method === "GET") {
          const conversationId = url.searchParams.get("conversationId");
          if (!conversationId) return error("conversationId is required");

          const { data, error: err } = await supabase
            .from("chat_messages")
            .select("id, sender_id, body, is_own, sent_at")
            .eq("conversation_id", conversationId)
            .order("sent_at");
          if (err) throw err;
          // Map to frontend shape
          const mapped = (data ?? []).map((r: Record<string, unknown>) => ({
            id: r.id,
            senderId: r.sender_id,
            text: r.body,
            time: formatTime(r.sent_at as string),
            isOwn: r.is_own,
          }));
          return json(mapped);
        }

        if (req.method === "POST") {
          const body = await req.json();
          const { conversationId, text } = body;
          if (!conversationId || !text) {
            return error("conversationId and text are required");
          }

          const { data, error: err } = await supabase
            .from("chat_messages")
            .insert({
              conversation_id: conversationId,
              sender_id: "admin",
              body: text,
              is_own: true,
            })
            .select()
            .single();
          if (err) throw err;

          // Update chat profile's last message
          await supabase
            .from("chat_profiles")
            .update({
              last_message: text,
              last_message_at: new Date().toISOString(),
            })
            .eq("customer_id", conversationId);

          return json({
            id: data.id,
            senderId: "admin",
            text: data.body,
            time: formatTime(data.sent_at),
            isOwn: true,
          }, 201);
        }

        return error("Method not allowed", 405);
      }

      default:
        return error(`Unknown route: ${route}`, 404);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return error(message, 500);
  }
});

// ──────────────────────────────────────────────
// Helper: format timestamp to relative time string
// ──────────────────────────────────────────────
function formatRelativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return "1d ago";
  return `${diffDays}d ago`;
}

// ──────────────────────────────────────────────
// Helper: format timestamp to time string (e.g. "10:30 AM")
// ──────────────────────────────────────────────
function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);

  if (diffDays >= 1) return "Yesterday";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
