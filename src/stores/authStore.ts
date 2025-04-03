import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
    role: string;
  } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set ) => ({
      isAuthenticated: false,
      user: null,
      login: async (username: string, password: string) => {
        // Simular una petición a API
        return new Promise((resolve) => {
          setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
              set({
                isAuthenticated: true,
                user: {
                  username: 'admin',
                  role: 'admin'
                }
              });
              resolve(true);
            } else {
              resolve(false);
            }
          }, 800);
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null
        });
      }
    }),
    {
      name: 'auth-storage', // nombre único para almacenamiento en localStorage
    }
  )
);