import { clsx } from "clsx";

import { Overlay } from "@/shared/ui/Overlay/Overlay";
import type { Product } from "@/shared/types/product.types";
import { useProductCart } from "@/shared/hooks/useProductCart";
import { ProductImage } from "@/shared/ui/ProductImage/ProductImage";
import { AddToCartButton } from "@/shared/ui/AddToCartButton/AddToCartButton";
import styles from "./ProductModal.module.scss";
import { useState } from "react";

type Props = {
  product: Product;
  onClose: () => void;
};

export function ProductModal({ product, onClose }: Props) {
  const { cartQuantity, isAvailable, maxPerOrder, increase, decrease, add } =
    useProductCart(product);
  const [per100, setPer100] = useState(true);

  const NUTR_KEY = per100 ? "per_100" : "total";
  const nutritionKeys = [
    ["calories", "Ккал"],
    ["proteins", "Белки"],
    ["fats", "Жиры"],
    ["carbs", "Углеводы"],
  ] as const;

  return (
    <>
      <Overlay onClose={onClose}>
        <div className={styles.content}>
          <ProductImage
            images={product.images}
            type="main"
            className={styles.image}
          />

          <div className={styles.info}>
            <div className={styles.scrollContainer}>
              <h2 className={styles.title}>{product.title}</h2>
              <div className={styles.weight}>{product.weight.display}</div>

              <p className={styles.description}>{product.description || "—"}</p>

              <div className={styles.composition}>
                <h3>Состав</h3>
                <p>{product.composition || "—"}</p>
              </div>

              <div className={styles.nutrition}>
                <h3>Пищевая ценность</h3>
                <div className={styles.nutritionToggle}>
                  <button
                    className={clsx(styles.toggleBtn, per100 && styles.active)}
                    type="button"
                    onClick={() => setPer100(true)}
                  >{`100 ${product.weight.unit}`}</button>
                  <button
                    className={clsx(styles.toggleBtn, !per100 && styles.active)}
                    type="button"
                    onClick={() => setPer100(false)}
                  >
                    {product.weight.display}
                  </button>
                </div>
                <div className={styles.nutritionValues}>
                  {nutritionKeys.map(([key, unit]) => {
                    const value = product.nutrition[NUTR_KEY]?.[key];
                    let finalValue;
                    if (value !== undefined && value !== null) {
                      finalValue =
                        value.toLocaleString("ru-RU") +
                        (["proteins", "fats", "carbs"].includes(key)
                          ? " г"
                          : "");
                    } else {
                      finalValue = "—";
                    }
                    return (
                      <div className={styles.nutritionValue} key={key}>
                        <span className={styles.unit}>{unit}</span>
                        <span className={styles.value}>{finalValue}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.addContainer}>
              <AddToCartButton
                value={cartQuantity}
                maxValue={maxPerOrder}
                isAvialable={isAvailable}
                onAdd={add}
                onIncrease={increase}
                onDecrease={decrease}
                className={styles.addBtn}
                price={product.price.final}
              />
            </div>
          </div>
        </div>
      </Overlay>
    </>
  );
}
