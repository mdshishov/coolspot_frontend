import { useCart } from "@/shared/hooks/useCart";
import { Button } from "@/shared/ui/Button/Button";

type Props = {
  selectedPrice: number;
  selectedCount: number;
  discount: number;
};

export function CartSummary({ selectedPrice, selectedCount, discount }: Props) {
  const { isUpdating } = useCart();

  return (
    <div>
      <div>
        Товаров:
        {selectedCount}
      </div>

      <div>
        Скидка:
        {discount} ₽
      </div>

      <div>
        Итого:
        {selectedPrice} ₽
      </div>

      <Button disabled={isUpdating || selectedCount === 0}>
        Оформить заказ
      </Button>
    </div>
  );
}
