import type { CartPosition } from "@/app/providers/cart/CartProvider";
import { useCart } from "@/shared/hooks/useCart";
import { AddToCartButton } from "@/shared/ui/AddToCartButton/AddToCartButton";
import { ProductImage } from "@/shared/ui/ProductImage/ProductImage";
import clsx from "clsx";

import styles from "./CartCard.module.scss";
import { ProductModal } from "@/widgets/ProductModal/ProductModal";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { DeleteIcon } from "@/assets/icons";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";

type Props = {
  position: CartPosition;
  className?: string;
};

export function CartCard({ position, className = "" }: Props) {
  const [opened, setOpened] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { setQuantity, warnings, setSelected, isUpdating } = useCart();
  const { dish, quantity } = position;

  const toggle = () => setSelected(dish.id, !position.is_selected);
  const remove = () => setQuantity(dish.id, 0, "full");
  const increase = () => setQuantity(dish.id, quantity + 1, "full");
  const decrease = () =>
    quantity === 1
      ? setConfirmOpen(true)
      : setQuantity(dish.id, quantity - 1, "full");

  const changed = Boolean(warnings[dish.id]);

  return (
    <>
      <div className={clsx(styles.card, className)}>
        {dish.is_available && (
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={position.is_selected}
              disabled={!position.is_available || isUpdating}
              onChange={toggle}
              className={styles.checkbox}
            />
            <span className={styles.checkboxCustom} />
          </label>
        )}

        {changed && <div className={styles.changedTag}>Изменено</div>}

        <ProductImage images={dish.images} className={styles.image} />

        <div className={styles.titleSection}>
          <div>
            <h3 onClick={() => setOpened(true)} className={styles.title}>
              {dish.title.toUpperCase()}
            </h3>
            <div className={styles.weight}>{dish.weight.display}</div>
          </div>

          <div className={styles.controls}>
            <Button
              variant="border"
              leftIcon={<DeleteIcon />}
              onClick={() => setConfirmOpen(true)}
            />
            <AddToCartButton
              value={quantity}
              isAvialable={dish.is_available}
              maxValue={dish.max_per_order}
              onIncrease={increase}
              onDecrease={decrease}
              onAdd={increase}
              className={styles.addBtn}
            />
          </div>
        </div>
        {dish.is_available && (
          <div className={styles.priceSection}>
            <div className={styles.priceInfo}>
              <div
                className={styles.finalPrice}
              >{`${dish.price.final.toLocaleString("ru-RU")} ₽`}</div>
              {dish.price.discount_percent > 0 && (
                <>
                  <div
                    className={styles.discount}
                  >{`–${dish.price.discount_percent}%`}</div>
                  <div
                    className={styles.basePrice}
                  >{`${dish.price.base.toLocaleString("ru-RU")} ₽`}</div>
                </>
              )}
            </div>
            <div className={styles.priceInfo}>
              <div className={styles.outcomeText}>Всего</div>
              <div
                className={styles.outcomePrice}
              >{`${(dish.price.final * quantity).toLocaleString("ru-RU")} ₽`}</div>
            </div>
          </div>
        )}
      </div>
      {opened && (
        <ProductModal product={dish} onClose={() => setOpened(false)} />
      )}

      {confirmOpen && (
        <ConfirmModal
          title="Удалить товар?"
          text={`Позиция «${dish.title}» будет удалена из корзины.`}
          confirmText="Удалить"
          rejectText="Отмена"
          onConfirm={remove}
          onReject={() => setConfirmOpen(false)}
        />
      )}
    </>
  );
}
