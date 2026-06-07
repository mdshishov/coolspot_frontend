import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { authApi } from "@/app/providers/auth/auth.api";
import { setAccessToken } from "@/app/api/axios";
import { tokenStorage } from "./tokenStorage";

type AuthContextType = {
  access: string | null;
  refresh: string | null;
  isInitialized: boolean;
  isAuthenticated: boolean;

  login: (phone: string, password: string) => Promise<void>;
  register: (
    phone: string,
    fullName: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<string>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [access, setAccess] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const isAuthenticated = access !== null;

  const login = useCallback(async (phone: string, password: string) => {
    const response = await authApi.login(phone, password);
    if (!response.access || !response.refresh) {
      throw new Error("Некорректный ответ сервера");
    }

    setAccess(response.access);
    setRefresh(response.refresh);
    setAccessToken(response.access);
    tokenStorage.setRefresh(response.refresh);
  }, []);

  const register = useCallback(
    async (phone: string, fullName: string, password: string) => {
      await authApi.register({
        phone,
        full_name: fullName,
        password,
      });

      await login(phone, password);
    },
    [login],
  );

  const logout = useCallback(() => {
    setAccess(null);
    setRefresh(null);
    setAccessToken(null);
    tokenStorage.removeRefresh();
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (!refresh) {
      throw new Error("Refresh-токен не найден");
    }

    const response = await authApi.refresh(refresh);
    if (!response.access) {
      throw new Error("Некорректный ответ сервера");
    }

    setAccess(response.access);
    setAccessToken(response.access);
    return response.access;
  }, [refresh]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedRefresh = tokenStorage.getRefresh();
        if (!storedRefresh) return;

        const response = await authApi.refresh(storedRefresh);
        if (!response.access) {
          throw new Error("Некорректный ответ сервера");
        }

        setAccess(response.access);
        setRefresh(storedRefresh);
        setAccessToken(response.access);
      } catch {
        logout();
      } finally {
        setIsInitialized(true);
      }
    };

    initialize();
  }, [logout]);

  const value = useMemo(
    () => ({
      access,
      refresh,

      isInitialized,
      isAuthenticated,

      login,
      register,
      logout,
      refreshAccessToken,
    }),
    [
      access,
      refresh,

      isInitialized,
      isAuthenticated,

      login,
      register,
      logout,
      refreshAccessToken,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
