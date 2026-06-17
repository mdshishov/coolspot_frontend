import { useCart } from "@/shared/hooks/useCart";
import { Button } from "@/shared/ui/Button/Button";

import styles from "./CartSummary.module.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  selectedPrice: number;
  selectedCount: number;
  basePrice: number;
  discount: number;
};

export function CartSummary({
  selectedPrice,
  selectedCount,
  discount,
  basePrice,
}: Props) {
  const { isUpdating } = useCart();
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <Button
        disabled={selectedCount === 0}
        loading={isUpdating}
        text="Перейти к офоромлению"
        onClick={() => navigate("/checkout")}
      />

      <div>
        <div className={styles.valGroup}>
          <div>
            Товары{"  •  "}
            {selectedCount} шт.
          </div>
          <div
            className={styles.basePrice}
          >{`${basePrice.toLocaleString("ru-RU")} ₽`}</div>
        </div>

        <div className={styles.valGroup}>
          <div>Скидка</div>
          <div
            className={styles.discount}
          >{`– ${discount.toLocaleString("ru-RU")} ₽`}</div>
        </div>
      </div>

      <div className={styles.outcomeGroup}>
        <div>Итого</div>
        <div>{`${selectedPrice.toLocaleString("ru-RU")} ₽`}</div>
      </div>
    </div>
  );
}
