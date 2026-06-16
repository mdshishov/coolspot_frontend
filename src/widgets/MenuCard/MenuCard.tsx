import { useState } from "react";

import type { Product } from "@/shared/types/product.types";
import { AddToCartButton } from "@/shared/ui/AddToCartButton/AddToCartButton";

import styles from "./MenuCard.module.scss";
import { ProductImage } from "@/shared/ui/ProductImage/ProductImage";
import { useProductCart } from "@/shared/hooks/useProductCart";
import { ProductModal } from "../ProductModal/ProductModal";

type MenuCardProps = {
  product: Product;
};

export function MenuCard({ product }: MenuCardProps) {
  const [opened, setOpened] = useState(false);
  const { cartQuantity, isAvailable, maxPerOrder, increase, decrease, add } =
    useProductCart(product);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.upper} onClick={() => setOpened(true)}>
          <ProductImage images={product.images} className={styles.image} />
          <div className={styles.info}>
            <div className={styles.titleInfo}>
              <h3 className={styles.title}>{product.title.toUpperCase()}</h3>
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
            onAdd={add}
            isAvialable={isAvailable}
            onIncrease={increase}
            onDecrease={decrease}
            className={styles.addBtn}
          />
        </div>
      </div>

      {opened && (
        <ProductModal product={product} onClose={() => setOpened(false)} />
      )}
    </>
  );
}
