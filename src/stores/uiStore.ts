import { create } from 'zustand';
import { Location } from '../hooks/useGeolocation';

interface UIState {
  sidebarCollapsed: boolean;
  location: Location | null;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setLocation: (location: Location) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  location: null,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setLocation: (location) => set({ location })
}));