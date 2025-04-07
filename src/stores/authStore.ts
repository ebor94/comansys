import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SapUserData {
  parid: string;
  parva: string;
  partxt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    username: string;
    role: string;
    sapData?: SapUserData[];
  } | null;
 
  loginSap: (usuario: string, codvend: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      
      loginSap: async (usuario: string, codvend: string = '', password: string) => {
        
        try {
          const response = await fetch('https://lilix.ceramicaitalia.com:3001/loginsap', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              usuario,
              codvend,
              password
            })
          });

          const data = await response.json();
         
          if (data.succes) {
           
            set({
              isAuthenticated: true,
              token: data.token,
              user: {
                username: usuario,
                role: 'sap',
                sapData: data.data
              }
            });
            console.log(data);
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error during SAP login:', error);
          return false;
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null
        });
        localStorage.removeItem('auth-storage');
        localStorage.clear();
      }
    }),
    {
      name: 'auth-storage', // nombre único para almacenamiento en localStorage
    }
  )
);