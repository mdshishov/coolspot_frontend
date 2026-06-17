import { useMemo } from "react";
import { clsx } from "clsx";

import styles from "./OrderDetails.module.scss";

import type { Order, OrderPosition } from "@/features/order/model/order.types";

type Props = {
  order: Order;
  className?: string;
};

const ORDER_STATUSES: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  new: {
    label: "Новый",
    className: styles.statusNew,
  },
  cooking: {
    label: "Готовится",
    className: styles.statusCooking,
  },
  delivery: {
    label: "Доставляется",
    className: styles.statusDelivery,
  },
  done: {
    label: "Завершён",
    className: styles.statusDone,
  },
  cancelled: {
    label: "Отменён",
    className: styles.statusCancelled,
  },
};

type OrderStatus = keyof typeof ORDER_STATUSES;

export function OrderDetails({ order, className = "" }: Props) {
  const count = useMemo(
    () =>
      order.positions.reduce(
        (sum: number, p: OrderPosition) => sum + p.quantity,
        0,
      ),
    [order.positions],
  );

  const status =
    ORDER_STATUSES[order.status as OrderStatus] ??
    ({
      label: order.status,
      className: "",
    } as const);

  return (
    <section className={clsx(styles.summary, className)}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>Заказ №{order.id}</h3>
          <div className={clsx(styles.status, status.className)}>
            {status.label}
          </div>
        </div>

        <div className={styles.subtitle}>
          {new Date(order.created_at).toLocaleString("ru-RU")}
          <span className={styles.dot}>•</span>
          {order.address}
        </div>
      </div>

      {order.comment && (
        <div className={styles.comment}>
          <strong>Комментарий:</strong> {order.comment}
        </div>
      )}

      <div className={styles.list}>
        {order.positions.map((position: OrderPosition, index: number) => (
          <div key={`${position.dish_title}-${index}`} className={styles.item}>
            <div className={styles.info}>
              <div className={styles.name}>{position.dish_title}</div>

              <div className={styles.meta}>
                {position.quantity} ×{" "}
                {position.dish_price.toLocaleString("ru-RU")} ₽
              </div>
            </div>

            <div className={styles.price}>
              {position.total_price.toLocaleString("ru-RU")} ₽
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <span>Позиций: {count}</span>

        <span>{order.total_price.toLocaleString("ru-RU")} ₽</span>
      </div>
    </section>
  );
}
