import { useState } from "react";
import { AxiosError } from "axios";

import { orderApi } from "../api/order.api";

import { useCart } from "@/shared/hooks/useCart";
import { useToast } from "@/shared/hooks/useToast";
import { showApiError } from "@/shared/utils/showApiError";

type CheckoutWarningsResponse = {
  warnings: unknown[];
};

export function useCheckout() {
  const { refreshCart, silentRefreshCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { showError } = useToast();

  const submit = async (address: string, comment: string) => {
    try {
      setLoading(true);

      const order = await orderApi.create({
        address,
        comment: comment || undefined,
      });

      await silentRefreshCart();

      return {
        success: true,
        order,
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        const data = error.response.data as CheckoutWarningsResponse;

        await refreshCart();

        return {
          success: false,
          warnings: data.warnings,
        };
      }

      showApiError(error, showError);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submit,
  };
}
