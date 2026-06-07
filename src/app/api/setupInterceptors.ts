import { api } from "./axios";

import { authApi } from "../providers/auth/auth.api";
import { tokenStorage } from "@/app/providers/auth/tokenStorage";
import { setAccessToken } from "./axios";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken() {
  const refreshToken = tokenStorage.getRefresh();
  if (!refreshToken) throw new Error("Refresh-токен не найден");

  const response = await authApi.refresh(refreshToken);
  setAccessToken(response.access);
  return response.access;
}

export function setupInterceptors() {
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing && refreshPromise) {
        const token = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      }

      try {
        isRefreshing = true;
        refreshPromise = refreshAccessToken();
        const token = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        tokenStorage.removeRefresh();
        setAccessToken(null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    },
  );
}
