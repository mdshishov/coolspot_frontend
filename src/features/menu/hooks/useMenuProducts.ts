import { useEffect, useState, useRef } from "react";

import { menuApi } from "../api/menu.api";
import { useToast } from "@/shared/hooks/useToast";
import { showApiError } from "@/shared/utils/showApiError";
import type {
  MenuResolveResult,
  MenuProductsResult,
} from "../model/menu.types";

export function useMenuProducts(
  resolved: MenuResolveResult,
): MenuProductsResult {
  const { showError } = useToast();
  const [state, setState] = useState<MenuProductsResult>({ status: "loading" });
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (resolved.status !== "success") return;

    requestIdRef.current += 1;
    const requestId = requestIdRef.current;

    const loadProducts = async () => {
      try {
        setState({ status: "loading" });
        const products = await menuApi.getProducts(resolved.apiParams);

        if (requestId !== requestIdRef.current) return;

        setState({ status: "success", products });
      } catch (error) {
        if (requestId !== requestIdRef.current) return;

        showApiError(error, showError);
        const message =
          "Что-то пошло не так. Пожалуйста, перезегрузите страницу или попробуйте позже.";
        setState({ status: "error", message });
      }
    };

    loadProducts();
  }, [resolved, showError]);

  return state;
}
