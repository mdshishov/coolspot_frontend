import { useMemo } from "react";

import { ProductImage } from "@/shared/ui/ProductImage/ProductImage";

import type { Product } from "@/shared/types/product.types";
import clsx from "clsx";

import styles from "./CheckoutSummary.module.scss";

export type Position = {
  dish: Product;
  quantity: number;

  is_available: boolean;
  is_selected: boolean;
};

type Props = {
  positions: Position[];
  className?: string;
};

export function CheckoutSummary({ positions, className = "" }: Props) {
  const total = useMemo(
    () =>
      positions.reduce((sum, p) => sum + p.dish.price.final * p.quantity, 0),
    [positions],
  );

  const count = useMemo(
    () => positions.reduce((sum, p) => sum + p.quantity, 0),
    [positions],
  );

  return (
    <section className={clsx(styles.summary, className)}>
      <h3 className={styles.title}>Ваш заказ</h3>

      <div className={styles.list}>
        {positions.map((position) => (
          <div key={position.dish.id} className={styles.item}>
            <ProductImage
              images={position.dish.images}
              className={styles.image}
            />

            <div className={styles.info}>
              <div className={styles.name}>{position.dish.title}</div>

              <div className={styles.meta}>
                {position.quantity} ×{" "}
                {position.dish.price.final.toLocaleString("ru-RU")} ₽
              </div>
            </div>

            <div className={styles.price}>
              {(position.quantity * position.dish.price.final).toLocaleString(
                "ru-RU",
              )}{" "}
              ₽
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <span>Позиций: {count}</span>

        <span>{total.toLocaleString("ru-RU")} ₽</span>
      </div>
    </section>
  );
}
