import { useCallback, useEffect, useState } from "react";

import { orderApi } from "../api/order.api";

import { showApiError } from "@/shared/utils/showApiError";
import { useToast } from "@/shared/hooks/useToast";
import type { Order } from "../model/order.types";

export function useOrders() {
  const { showError } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const data = await orderApi.getAll();

      setOrders(data);
    } catch (error) {
      showApiError(error, showError);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    orders,
    loading,
    refresh,
  };
}
