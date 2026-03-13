# CRAVEAT - Food Delivery Admin Dashboard

> A frontend-only admin dashboard for the "CRAVEAT" food delivery service, built with React, TypeScript, and Tailwind CSS.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Folder Structure](#folder-structure)
5. [Architecture & Design Decisions](#architecture--design-decisions)
6. [Color Palette & Theme](#color-palette--theme)
7. [Routing](#routing)
8. [State Management](#state-management)
9. [TypeScript Interfaces](#typescript-interfaces)
10. [Pages](#pages)
11. [Components](#components)
12. [Data Layer](#data-layer)
13. [Mock Data Schema](#mock-data-schema)
14. [Key Conventions](#key-conventions)

---

## Project Overview

CRAVEAT is a **frontend-only** admin dashboard for a food delivery service. There is no backend — all data is served from a local `mockdata.json` file through a typed data service layer. The application consists of three main screens:

| Screen | Route | Purpose |
|--------|-------|---------|
| **Dashboard** | `/` | KPI stats, order summary charts, revenue analytics |
| **Orders** | `/orders` | Searchable/filterable order table with status badges |
| **Chats** | `/chats` | Real-time-style two-panel messaging interface |

Four additional routes (`/analytics`, `/customer`, `/reviews`, `/wallet`) render placeholder "Coming Soon" pages.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **Vite** | 8.x | Build tool & dev server |
| **React** | 19.x | UI framework |
| **TypeScript** | ~5.9 | Type safety |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Recharts** | 3.x | Charts (donut, area, bar) |
| **Lucide React** | latest | Icon library (1400+ icons) |
| **React Router DOM** | 7.x | Client-side routing (v6+ API) |
| **Zustand** | 5.x | Lightweight global state |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Type check
npx tsc --noEmit

# Production build
npm run build
```

---

## Folder Structure

```
src/
├── assets/
│   └── mockdata.json              # All mock data (single source of truth)
├── components/
│   ├── ui/                        # Reusable atomic UI components
│   │   ├── Card.tsx               # White card container with optional title & action
│   │   ├── Badge.tsx              # Order status badge (Delivered/On Delivery/Cancelled)
│   │   ├── StatCard.tsx           # KPI stat card with icon, value, trend
│   │   ├── SearchBar.tsx          # Input with search icon
│   │   └── Dropdown.tsx           # Styled <select> dropdown
│   ├── layout/                    # Application shell
│   │   ├── Sidebar.tsx            # Left navigation with 7 nav items + logo + logout
│   │   ├── TopHeader.tsx          # Top bar with page title, notifications, user avatar
│   │   └── MainLayout.tsx         # Flex container: Sidebar + (TopHeader + <Outlet />)
│   └── charts/                    # Data visualization wrappers
│       ├── ProgressRing.tsx       # Custom SVG circular progress (NOT Recharts)
│       ├── DonutChart.tsx         # Recharts PieChart with innerRadius (donut)
│       ├── GroupedBarChart.tsx     # Recharts BarChart with 2 grouped bars
│       └── RevenueAreaChart.tsx   # Recharts AreaChart with purple gradient fill
├── pages/
│   ├── Dashboard.tsx              # Main dashboard with all widgets
│   ├── Orders.tsx                 # Order table with search & filters
│   ├── Chats.tsx                  # Two-panel chat interface
│   └── PlaceholderPage.tsx        # "Coming Soon" for unbuilt pages
├── services/
│   └── mockDataService.ts         # Typed data access layer over mockdata.json
├── store/
│   └── useStore.ts                # Zustand store (sidebar toggle, active chat)
├── types/
│   └── index.ts                   # All TypeScript interfaces
├── App.tsx                        # Router setup (createBrowserRouter)
├── main.tsx                       # Entry point (createRoot)
└── index.css                      # Tailwind directives + global styles
```

---

## Architecture & Design Decisions

### Layout Pattern
The app uses a **shell layout** via React Router's `<Outlet />`:
- `MainLayout` wraps all routes with a persistent `Sidebar` (left) and `TopHeader` (top)
- Page content renders inside the `<Outlet />` below the header
- The sidebar is sticky and full-height; the main content area scrolls independently

### Data Flow
```
mockdata.json → mockDataService.ts (typed getters) → Pages (import & render)
```
- No API calls, no async loading, no React Query
- Data is imported statically and accessed through synchronous getter functions
- Each getter returns a properly typed array

### Component Hierarchy
```
App (RouterProvider)
└── MainLayout
    ├── Sidebar (nav links via NavLink)
    ├── TopHeader (page title derived from useLocation)
    └── <Outlet /> → Dashboard | Orders | Chats | PlaceholderPage
```

### State Management (Zustand)
Minimal global state — only two concerns need to be shared:

| State | Type | Used By |
|-------|------|---------|
| `sidebarOpen` | `boolean` | Sidebar, TopHeader (toggle button) |
| `activeChatId` | `string` | Chats page (contact list + message panel) |

Everything else is local component state (search inputs, filters, chat message input).

---

## Color Palette & Theme

Defined in `tailwind.config.js` under `theme.extend.colors.primary`:

| Token | Value | Tailwind Class | Usage |
|-------|-------|---------------|-------|
| **Primary** | `#7C3AED` | `bg-primary`, `text-primary` | Buttons, active states, outgoing chat bubbles, chart accents |
| **Primary Light** | `#A78BFA` | `bg-primary-light` | Secondary chart color (last week bars) |
| **Primary Lightest** | `#EDE9FE` | `bg-primary-lightest` | Active nav item background, hover states |
| **Primary BG** | `#F5F3FF` | `bg-primary-bg` | Main page background |

### Status Colors (standard Tailwind)
| Status | Color | Hex |
|--------|-------|-----|
| Delivered | Emerald | `#10B981` |
| On Delivery | Amber | `#F59E0B` |
| Cancelled | Red | `#EF4444` |

### Typography
- **Font**: Inter (loaded via Google Fonts CDN in `index.html`)
- **Weights**: 400 (body), 500 (medium), 600 (semibold), 700 (bold)

---

## Routing

Configured in `src/App.tsx` using `createBrowserRouter`:

| Path | Component | Status |
|------|-----------|--------|
| `/` | `Dashboard` | Implemented |
| `/orders` | `Orders` | Implemented |
| `/chats` | `Chats` | Implemented |
| `/analytics` | `PlaceholderPage` | Coming Soon |
| `/customer` | `PlaceholderPage` | Coming Soon |
| `/reviews` | `PlaceholderPage` | Coming Soon |
| `/wallet` | `PlaceholderPage` | Coming Soon |

All routes are nested under the `MainLayout` route, which provides the sidebar + header shell.

### Sidebar Navigation Items
The sidebar renders 7 navigation links using React Router's `<NavLink>` with active state styling (purple left border + light purple background):

1. Dashboard (`/`) — `LayoutDashboard` icon
2. Orders (`/orders`) — `ShoppingBag` icon
3. Analytics (`/analytics`) — `BarChart3` icon
4. Customer (`/customer`) — `Users` icon
5. Reviews (`/reviews`) — `Star` icon
6. Chats (`/chats`) — `MessageSquare` icon
7. Wallet (`/wallet`) — `Wallet` icon

---

## State Management

**Store**: `src/store/useStore.ts` (Zustand)

```typescript
interface AppState {
  sidebarOpen: boolean;          // Controls sidebar expand/collapse
  activeChatId: string;          // Currently selected chat user ID
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveChatId: (id: string) => void;
}
```

**Default values**:
- `sidebarOpen`: `true`
- `activeChatId`: `'joe-martin'`

---

## TypeScript Interfaces

All interfaces defined in `src/types/index.ts`:

| Interface | Used By | Fields |
|-----------|---------|--------|
| `StatCardData` | Dashboard stat cards | id, label, value, icon, trend?, trendUp? |
| `OrderSummaryItem` | Dashboard progress rings | label, value, total, color |
| `OverviewSlice` | Dashboard donut chart | name, value, color |
| `TopSellingItem` | Dashboard top selling list | id, name, price, image |
| `CustomerMapEntry` | Dashboard bar chart | day, thisWeek, lastWeek |
| `RevenueEntry` | Dashboard area chart | month, revenue |
| `Order` | Orders table | id, customerName, avatar, payment, location, status, contact |
| `OrderStatus` | Badge component | `'Delivered' \| 'On Delivery' \| 'Cancelled'` |
| `ChatUser` | Chat contact list | id, name, avatar, lastMessage, time, unread?, online? |
| `ChatMessage` | Chat message bubbles | id, senderId, text, time, isOwn |

---

## Pages

### Dashboard (`src/pages/Dashboard.tsx`)

Three-row layout assembled from chart and UI components:

**Row 1** — Stat Cards (5-column grid):
- Total Orders (75), Total Delivered (70), Total Cancelled (05), Total Revenue ($12k), Total Pending (12)
- Each card shows an icon, value, label, and trend percentage

**Row 2** — Three-column grid:
- **Order Summary**: 3 `ProgressRing` components showing On Delivery (30/75), Delivered (35/75), Cancelled (5/75)
- **Overview**: `DonutChart` with 3 slices + center total label + legend
- **Top Selling**: Ranked list of 3 food items with emoji icons and prices

**Row 3** — Two-column grid:
- **Customer Map**: `GroupedBarChart` comparing this week vs. last week (Mon–Sun)
- **Total Revenue**: `RevenueAreaChart` showing monthly revenue (Jan–Dec) with purple gradient

### Orders (`src/pages/Orders.tsx`)

- **Header**: Title + `SearchBar` + 2 `Dropdown` filters (date period, year)
- **Table**: 6 columns — Order ID, Customer Name (avatar + text), Payment, Location, Status (`Badge`), Contact (phone icon)
- **Search**: Client-side filter on customer name or order ID
- **Data**: 9 order rows from mock data

### Chats (`src/pages/Chats.tsx`)

Two-panel layout:
- **Left Panel** (`w-80`): Search bar + scrollable contact list with avatars, online indicators, last message preview, timestamps, unread badges
- **Right Panel** (`flex-1`): Chat header (name, status, call/video icons) + scrollable messages + input bar
- **Message Bubbles**: Outgoing = purple bg, right-aligned, rounded-br-md; Incoming = gray bg, left-aligned, rounded-bl-md
- **Send**: Append to local state (not persisted), auto-scroll to bottom on new message
- **Active Chat**: Controlled by Zustand `activeChatId`, defaults to Joe Martin

### PlaceholderPage (`src/pages/PlaceholderPage.tsx`)

- Derives page title from `useLocation().pathname`
- Shows a construction icon + "Coming Soon" message
- Used for Analytics, Customer, Reviews, Wallet routes

---

## Components

### UI Components (`src/components/ui/`)

| Component | Props | Description |
|-----------|-------|-------------|
| `Card` | `title?`, `children`, `className?`, `action?` | White rounded card with optional header row |
| `Badge` | `status: OrderStatus` | Colored pill with dot indicator (green/amber/red) |
| `StatCard` | `data: StatCardData` | Icon circle + value + label + trend arrow |
| `SearchBar` | `value`, `onChange`, `placeholder?`, `className?` | Input with Lucide Search icon |
| `Dropdown` | `value`, `options`, `onChange`, `className?` | Styled native select with chevron |

### Layout Components (`src/components/layout/`)

| Component | Description |
|-----------|-------------|
| `Sidebar` | Fixed-width left nav, collapsible (240px → 80px), NavLink active styles, CRAVEAT logo, logout button |
| `TopHeader` | Sticky top bar, dynamic page title, notification/mail/settings icon buttons, admin avatar |
| `MainLayout` | Flex container combining Sidebar + TopHeader + Outlet |

### Chart Components (`src/components/charts/`)

| Component | Library | Props |
|-----------|---------|-------|
| `ProgressRing` | Custom SVG | `value`, `total`, `color`, `size?`, `strokeWidth?` |
| `DonutChart` | Recharts PieChart | `data: OverviewSlice[]` |
| `GroupedBarChart` | Recharts BarChart | `data: CustomerMapEntry[]` |
| `RevenueAreaChart` | Recharts AreaChart | `data: RevenueEntry[]` |

**ProgressRing** uses raw SVG `<circle>` elements with `stroke-dasharray`/`stroke-dashoffset` for the percentage arc animation. All other charts use Recharts with `<ResponsiveContainer>`.

---

## Data Layer

### Mock Data Service (`src/services/mockDataService.ts`)

Typed getter functions that import from `mockdata.json`:

```typescript
getStats(): StatCardData[]
getOrderSummary(): OrderSummaryItem[]
getOverview(): OverviewSlice[]
getTopSelling(): TopSellingItem[]
getCustomerMap(): CustomerMapEntry[]
getRevenue(): RevenueEntry[]
getOrders(): Order[]
getChatUsers(): ChatUser[]
getChatMessages(chatId: string): ChatMessage[]
```

All functions are **synchronous** — they return data directly from the statically imported JSON.

---

## Mock Data Schema

### `mockdata.json` top-level keys:

| Key | Type | Records | Used By |
|-----|------|---------|---------|
| `stats` | `StatCardData[]` | 5 | Dashboard stat cards |
| `orderSummary` | `OrderSummaryItem[]` | 3 | Dashboard progress rings |
| `overview` | `OverviewSlice[]` | 3 | Dashboard donut chart |
| `topSelling` | `TopSellingItem[]` | 3 | Dashboard top selling list |
| `customerMap` | `CustomerMapEntry[]` | 7 | Dashboard grouped bar chart |
| `revenue` | `RevenueEntry[]` | 12 | Dashboard area chart |
| `orders` | `Order[]` | 9 | Orders table |
| `chatUsers` | `ChatUser[]` | 8 | Chat contact list |
| `chatMessages` | `Record<string, ChatMessage[]>` | 8 convos | Chat message bubbles |

### Avatars
All avatars use the `ui-avatars.com` API:
```
https://ui-avatars.com/api/?name=Name&background=HexColor&color=fff
```

---

## Key Conventions

- **Styling**: Tailwind utility classes only — no CSS modules, no styled-components, no inline style objects (except for dynamic colors in charts)
- **Icons**: All icons from `lucide-react` — imported individually by name
- **Rounding**: Cards and inputs use `rounded-2xl` (16px); buttons use `rounded-xl` (12px)
- **Shadows**: Cards use `shadow-sm`; tooltips use custom box-shadow
- **Spacing**: Consistent `p-5` (20px) card padding; `p-6` (24px) page padding; `gap-4` (16px) grid gaps
- **Font Sizes**: Page titles `text-xl`, card titles `text-base`, body text `text-sm`, labels `text-xs`
- **No Backend**: All data is static JSON — no fetch calls, no loading states, no error boundaries for data
- **Local-only chat**: Sent messages are stored in React state (`useState`) — they reset on page refresh
