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
  centro: any | null;
  oficinaVentas: string | null;
  canal: string | null;
  zona: string | null;
  grupoVendedor: string | null;
  organizacionVentas?: string | null;
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
      centro: null,
      oficinaVentas: null,
      canal: null,
      zona: null,
      grupoVendedor: null,
      organizacionVentas: null,
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
             let centroData = (data.data as SapUserData[]).find((item: SapUserData) => item.parid === 'WRK') || null;
             let oficinaVentasData = (data.data as SapUserData[]).find((item: SapUserData) => item.parid === 'VKB') || null;
             let canalData = (data.data as SapUserData[]).find((item: SapUserData) => item.parid === 'VTW') || null;
             let zonaData = (data.data as SapUserData[]).find((item: SapUserData) => item.parid === 'BZI') || null;
             let grupoVendedorData = (data.data as SapUserData[]).find((item: SapUserData) => item.parid === 'VKG') || null;
             let organizacionVentasData = (data.data as SapUserData[]).find((item: SapUserData) => item.parid === 'VKO') || null;
            set({
              isAuthenticated: true,
              token: data.token,
              user: {
                username: usuario,
                role: 'sap',
                sapData: data.data
              },
                   
              centro : centroData?.parva,
              oficinaVentas : oficinaVentasData?.parva,
              canal : canalData?.parva,
              zona : zonaData?.parva,
              grupoVendedor : grupoVendedorData?.parva,
              organizacionVentas : organizacionVentasData?.parva

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