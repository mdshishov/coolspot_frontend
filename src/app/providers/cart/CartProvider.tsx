import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import axios from "axios";

import { cartApi } from "@/app/providers/cart/cart.api";
import { normalizeSummary } from "./cart.mapper";
import type { SetPositionPayload } from "@/shared/types/cart.types";
import { showApiError } from "@/shared/utils/showApiError";
import { useToast } from "@/shared/hooks/useToast";

type CartContextType = {
  positions: Record<number, number>;
  totalDishes: number;
  isInitialized: boolean;

  getProductQuantity: (dishId: number) => number;
  setQuantity: (dishId: number, quantity: number) => Promise<void>;
  refreshPositions: () => Promise<void>;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

type Props = { children: ReactNode };

export function CartProvider({ children }: Props) {
  const { showError } = useToast();
  const [positions, setPositions] = useState<Record<number, number>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  const refreshPositions = useCallback(async () => {
    try {
      const data = await cartApi.getSummary();
      const normalizedData = normalizeSummary(data);
      setPositions(normalizedData.positions);
    } catch (error) {
      if (!(axios.isAxiosError(error) && error.response?.status === 401)) {
        showApiError(error, showError);
      }
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await refreshPositions();
      } finally {
        setIsInitialized(true);
      }
    };

    init();
  }, [refreshPositions]);

  const totalDishes = useMemo(
    () => Object.values(positions).reduce((sum, quantity) => sum + quantity, 0),
    [positions],
  );

  const getProductQuantity = useCallback(
    (dishId: number) => {
      return positions[dishId] ?? 0;
    },
    [positions],
  );

  const setQuantity = useCallback(
    async (dishId: number, quantity: number) => {
      const previousPositions = positions;

      setPositions((prev) => {
        const next = { ...prev };

        if (quantity <= 0) {
          delete next[dishId];
        } else {
          next[dishId] = quantity;
        }

        return next;
      });

      try {
        const payload: SetPositionPayload = {
          dish_id: dishId,
          quantity,
        };

        const data = await cartApi.setPosition(payload);
        const normalizedData = normalizeSummary(data);
        setPositions(normalizedData.positions);
      } catch (error) {
        setPositions(previousPositions);
        showApiError(error, showError);

        await refreshPositions();
      }
    },
    [positions, refreshPositions],
  );

  const value = useMemo(
    () => ({
      positions,
      totalDishes,
      isInitialized,

      getProductQuantity,
      setQuantity,
      refreshPositions,
    }),
    [
      positions,
      totalDishes,
      isInitialized,
      getProductQuantity,
      setQuantity,
      refreshPositions,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
