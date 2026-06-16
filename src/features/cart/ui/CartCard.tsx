import type { CartPosition } from "@/app/providers/cart/CartProvider";
import { useCart } from "@/shared/hooks/useCart";
import { AddToCartButton } from "@/shared/ui/AddToCartButton/AddToCartButton";
import { ProductImage } from "@/shared/ui/ProductImage/ProductImage";
import clsx from "clsx";

import styles from "./Cart.module.scss";
import { ProductModal } from "@/widgets/ProductModal/ProductModal";
import { useState } from "react";

type Props = {
  position: CartPosition;
  className?: string;
};

export function CartCard({ position, className = "" }: Props) {
  const [opened, setOpened] = useState(false);
  const { setQuantity, warnings, setSelected, isUpdating } = useCart();
  const { dish, quantity, is_available } = position;

  const toggle = () => setSelected(dish.id, !position.is_selected);
  const remove = () => setQuantity(dish.id, 0, "full");
  const increase = () => setQuantity(dish.id, quantity + 1, "full");
  const decrease = () => setQuantity(dish.id, quantity - 1, "full");

  const changed = Boolean(warnings[dish.id]);

  return (
    <>
      <div className={clsx(styles.item, className)}>
        <input
          type="checkbox"
          checked={position.is_selected}
          disabled={!position.is_available || isUpdating}
          onChange={toggle}
        />
        <ProductImage images={dish.images} />

        <div>
          <h3 onClick={() => setOpened(true)}>{dish.title}</h3>

          <div>{dish.weight.display}</div>

          {!is_available ? (
            <>
              <div>Недоступно</div>

              <button onClick={remove}>Удалить</button>
            </>
          ) : (
            <AddToCartButton
              value={quantity}
              maxValue={dish.max_per_order}
              onIncrease={increase}
              onDecrease={decrease}
              onAdd={increase}
            />
          )}

          {changed && <span>Изменено</span>}
        </div>
      </div>
      {opened && (
        <ProductModal
          product={position.dish}
          onClose={() => setOpened(false)}
        />
      )}
    </>
  );
}
