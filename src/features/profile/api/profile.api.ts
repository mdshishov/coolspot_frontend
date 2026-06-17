import { api } from "@/app/api/axios";

export type Profile = {
  full_name: string;
  email: string;
  phone: string;
};

export const profileApi = {
  async getProfile() {
    const response = await api.get("/auth/profile/");

    return response.data;
  },
};
