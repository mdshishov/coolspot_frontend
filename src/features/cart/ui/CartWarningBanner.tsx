import { useCart } from "@/shared/hooks/useCart";
import styles from "./Cart.module.scss";

export function CartWarningBanner() {
  const { warnings } = useCart();

  return (
    <div className={styles.banner}>
      Корзина была обновлена. Некоторые товары были изменены.
    </div>
  );
}
