import { create } from 'zustand';

interface AppState {
  sidebarOpen: boolean;
  activeChatId: string;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveChatId: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  sidebarOpen: true,
  activeChatId: 'a1000001-0000-0000-0000-000000000001',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveChatId: (id) => set({ activeChatId: id }),
}));
