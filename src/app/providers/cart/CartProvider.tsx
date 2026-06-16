import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { cartApi } from "./cart.api";
import { normalizeWarnings } from "./cart.mapper";
import type {
  CartResponse,
  CartWarning,
  SetPositionPayload,
  SetPositionResponse,
} from "@/shared/types/cart.types";
import { showApiError } from "@/shared/utils/showApiError";
import { useToast } from "@/shared/hooks/useToast";
import { useAuth } from "@/shared/hooks/useAuth";
import type { Product } from "@/shared/types/product.types";

export type CartPosition = {
  dish: Product;
  quantity: number;

  is_available: boolean;
  is_selected: boolean;
};

type RefreshMode = "summary" | "full";

type CartContextType = {
  positions: Record<number, number>;
  cartPositions: CartPosition[];
  selectedPrice: number;
  totalDishes: number;
  warnings: Record<number, CartWarning>;
  isInitialized: boolean;
  isUpdating: boolean;
  loading: boolean;

  getProductQuantity: (dishId: number) => number;
  setQuantity: (
    dishId: number,
    quantity: number,
    mode?: "summary" | "full",
  ) => Promise<void>;
  setSelected: (dishId: number, selected: boolean) => Promise<void>;
  refreshPositions: () => Promise<void>;
  refreshCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

type Props = { children: ReactNode };

export function CartProvider({ children }: Props) {
  const { showError } = useToast();
  const { isAuthenticated } = useAuth();
  const [positions, setPositions] = useState<Record<number, number>>({});
  const [warnings, setWarnings] = useState<Record<number, CartWarning>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [cartPositions, setCartPositions] = useState<CartPosition[]>([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [totalDishes, setTotalDishes] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) return;
    setPositions({});
    setCartPositions([]);
    setWarnings({});
    setSelectedPrice(0);
    setTotalDishes(0);
  }, [isAuthenticated]);

  const applySummary = useCallback((data: SetPositionResponse) => {
    setWarnings(normalizeWarnings(data.warnings));
    setTotalDishes(data.cart_summary.total_dishes);

    setPositions(
      Object.fromEntries(
        data.cart_summary.positions.map((p) => [p.dish_id, p.quantity]),
      ),
    );
  }, []);

  const getProductQuantity = useCallback(
    (dishId: number) => {
      return positions[dishId] ?? 0;
    },
    [positions],
  );

  const applyCart = useCallback((data: CartResponse) => {
    setWarnings(normalizeWarnings(data.warnings));
    setCartPositions(data.cart.positions);
    setSelectedPrice(data.cart.selected_price);
    setTotalDishes(data.cart.total_dishes);
    setPositions(
      Object.fromEntries(
        data.cart.positions.map((p) => [p.dish.id, p.quantity]),
      ),
    );
  }, []);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await cartApi.getCart();

      applyCart(data);
    } catch (error) {
      showApiError(error, showError);
    } finally {
      setLoading(false);
    }
  }, [applyCart, isAuthenticated, showError]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsInitialized(true);
      return;
    }

    let mounted = true;
    const init = async () => {
      try {
        setIsInitialized(false);
        await refreshCart();
      } finally {
        if (mounted) {
          setIsInitialized(true);
        }
      }
    };
    init();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, refreshCart]);

  const refreshPositions = useCallback(async () => {
    await refreshCart();
  }, [refreshCart]);

  const updatePosition = useCallback(
    async (payload: SetPositionPayload, mode: RefreshMode = "summary") => {
      try {
        setIsUpdating(true);
        const data = await cartApi.setPosition(payload);
        applySummary(data);

        if (mode === "full") {
          await refreshCart();
        }
      } catch (error) {
        showApiError(error, showError);
        await refreshCart();
      } finally {
        setIsUpdating(false);
      }
    },
    [applySummary, refreshCart, showError],
  );

  const setQuantity = useCallback(
    async (dishId: number, quantity: number, mode: RefreshMode = "summary") => {
      await updatePosition(
        {
          dish_id: dishId,
          quantity,
        },
        mode,
      );
    },
    [updatePosition],
  );

  const setSelected = useCallback(
    async (dishId: number, selected: boolean, mode: RefreshMode = "full") => {
      await updatePosition(
        {
          dish_id: dishId,
          is_selected: selected,
        },
        mode,
      );
    },
    [updatePosition],
  );

  const value = useMemo(
    () => ({
      positions,
      cartPositions,
      selectedPrice,
      totalDishes,
      warnings,
      isInitialized,
      isUpdating,
      loading,

      setQuantity,
      setSelected,
      getProductQuantity,
      refreshPositions,
      refreshCart,
    }),
    [
      positions,
      cartPositions,
      selectedPrice,
      totalDishes,
      warnings,
      isInitialized,
      isUpdating,
      loading,

      setQuantity,
      setSelected,
      getProductQuantity,
      refreshPositions,
      refreshCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
