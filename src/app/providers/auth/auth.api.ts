import { api } from "../../api/axios";

import type {
  CheckPhoneResponse,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/features/auth/auth.types";

export const authApi = {
  async checkPhone(phone: string): Promise<CheckPhoneResponse> {
    const response = await api.post<CheckPhoneResponse>("/auth/check-phone/", {
      phone,
    });
    return response.data;
  },

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login/", {
      username,
      password,
    });
    return response.data;
  },

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      "/auth/register/",
      payload,
    );
    return response.data;
  },

  async refresh(refresh: string): Promise<RefreshResponse> {
    const response = await api.post<RefreshResponse>("/auth/refresh/", {
      refresh,
    });
    return response.data;
  },
};
