import { clsx } from "clsx";

import styles from "./AddToCartButton.module.scss";
import { Button } from "../Button/Button";
import { CartIcon, MinusIcon, PlusIcon } from "@/assets/icons";

type Props = {
  value: number;
  maxValue: number;
  isAvialable?: boolean;
  className?: string;
  price?: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function AddToCartButton({
  value,
  maxValue,
  isAvialable = true,
  className = "",
  price,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  if (!isAvialable)
    return (
      <div className={clsx(styles.unavialable, className)}>Нет в наличии</div>
    );

  const priceStr =
    price === undefined || price === null
      ? ""
      : `  ·  ${(price * (value || 1)).toLocaleString("ru-RU")} ₽`;
  const unitPriceStr = priceStr ? ` шт.${priceStr}` : "";

  if (value === 0)
    return (
      <Button
        text={`Добавить${priceStr}`}
        leftIcon={<CartIcon />}
        onClick={onAdd}
        className={clsx(styles.addBtn, className)}
      />
    );

  return (
    <div className={clsx(styles.counter, className)}>
      <button type="button" className={styles.actionBtn} onClick={onDecrease}>
        <MinusIcon />
      </button>
      <span className={styles.value}>{`${value}${unitPriceStr}`}</span>
      <button
        type="button"
        className={styles.actionBtn}
        disabled={value === maxValue}
        onClick={onIncrease}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
