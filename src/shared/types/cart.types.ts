export type CartSummary = {
  total_dishes: number;
  positions: {
    dish_id: number;
    quantity: number;
  }[];
};

export type SetPositionPayload = {
  dish_id: number;
  quantity?: number;
  is_selected?: boolean;
};
