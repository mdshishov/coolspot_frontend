import { useEffect, useMemo, useState } from "react";

import { useCart } from "@/shared/hooks/useCart";
import type { Product } from "@/shared/types/product.types";
import { useToast } from "@/shared/hooks/useToast";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAuthModal } from "@/shared/hooks/useAuthModal";
import { AddToCartButton } from "@/shared/ui/AddToCartButton/AddToCartButton";

import styles from "./MenuCard.module.scss";
import { ProductImage } from "@/shared/ui/ProductImage/ProductImage";

type MenuCardProps = {
  product: Product;
};

export function MenuCard({ product }: MenuCardProps) {
  const { getProductQuantity, setQuantity, warnings } = useCart();
  const { isAuthenticated } = useAuth();
  const { open } = useAuthModal();
  const { showInfo } = useToast();

  const [isAvailable, setIsAvailable] = useState(product.is_available);
  const [maxPerOrder, setMaxPerOrder] = useState(product.max_per_order);

  const cartQuantity = useMemo(
    () => getProductQuantity(product.id),
    [getProductQuantity, product.id],
  );

  useEffect(() => {
    setIsAvailable(product.is_available);
    setMaxPerOrder(product.max_per_order);
  }, [product.is_available, product.max_per_order]);

  useEffect(() => {
    const warning = warnings[product.id];
    if (!warning) return;

    switch (warning.code) {
      case "dish_unavailable":
        setIsAvailable(false);
        showInfo(`Позиция «${product.title}» временно недоступна для заказа.`);
        break;

      case "max_per_order_exceeded":
        setMaxPerOrder(cartQuantity);
        showInfo(
          "Были изменены ограничения на максимальное количество данной позиции в заказе.",
        );
        break;
    }
  }, [warnings, product.id, cartQuantity]);

  const updateQuantity = async (quantity: number) => {
    if (!isAvailable) return;
    if (!isAuthenticated) {
      open();
      return;
    }

    const next = Math.max(0, quantity);
    if (maxPerOrder !== null && next > maxPerOrder) return;

    await setQuantity(product.id, next);
  };
  const increase = () => updateQuantity(cartQuantity + 1);
  const decrease = () => updateQuantity(cartQuantity - 1);

  return (
    <div className={styles.card}>
      <div className={styles.upper}>
        <ProductImage images={product.images} className={styles.image} />
        <div className={styles.info}>
          <div className={styles.titleInfo}>
            <div className={styles.title}>{product.title.toUpperCase()}</div>
            <div className={styles.weight}>{product.weight.display}</div>
          </div>
          <div className={styles.priceInfo}>
            <div
              className={styles.finalPrice}
            >{`${product.price.final.toLocaleString("ru-RU")} ₽`}</div>
            {product.price.discount_percent > 0 && (
              <>
                <div
                  className={styles.discount}
                >{`–${product.price.discount_percent}%`}</div>
                <div
                  className={styles.basePrice}
                >{`${product.price.base.toLocaleString("ru-RU")} ₽`}</div>
              </>
            )}
          </div>
        </div>
        {product.tags.length > 0 && (
          <div className={styles.tag}>{product.tags[0].title}</div>
        )}
      </div>

      <div className={styles.lower}>
        <AddToCartButton
          value={cartQuantity}
          maxValue={maxPerOrder}
          onAdd={() => updateQuantity(1)}
          isAvialable={isAvailable}
          onIncrease={increase}
          onDecrease={decrease}
          className={styles.addBtn}
        />
      </div>
    </div>
  );
}
