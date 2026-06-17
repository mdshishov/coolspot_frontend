import { useCallback, useEffect, useState } from "react";

import { orderApi } from "@/features/order/api/order.api";
import { useAuth } from "@/shared/hooks/useAuth";
import { useToast } from "@/shared/hooks/useToast";
import { showApiError } from "@/shared/utils/showApiError";

import type { Order } from "@/features/order/model/order.types";
import { profileApi } from "../api/profile.api";

type Profile = {
  full_name: string;
  email: string;
  phone: string;
};

export function useProfile() {
  const { isAuthenticated } = useAuth();
  const { showError } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!isAuthenticated) {
      setProfile(null);
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [profileData, ordersData] = await Promise.all([
        profileApi.getProfile(),
        orderApi.getAll(),
      ]);

      setProfile(profileData);
      setOrders(ordersData);
    } catch (error) {
      showApiError(error, showError);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, showError]);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setRefreshing(true);

      const [profileData, ordersData] = await Promise.all([
        profileApi.getProfile(),
        orderApi.getAll(),
      ]);

      setProfile(profileData);
      setOrders(ordersData);
    } catch (error) {
      showApiError(error, showError);
    } finally {
      setRefreshing(false);
    }
  }, [isAuthenticated, showError]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    profile,
    orders,

    loading,
    refreshing,

    refresh,
  };
}
