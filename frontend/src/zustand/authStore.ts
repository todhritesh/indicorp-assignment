import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken:(accessToken: string) => void;
  setIsAuthenticated:(isAuth: boolean) => void;
};

export const useAuthState = create<AuthState>((set) => ({
    accessToken: null,
    isAuthenticated: false,
    setAccessToken: (token:string) => set(() => ({accessToken : token })),
    setIsAuthenticated: (isAuth:boolean) => set(() => ({isAuthenticated : isAuth })),
  }))