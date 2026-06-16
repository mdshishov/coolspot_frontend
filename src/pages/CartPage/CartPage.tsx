import { useEffect } from "react";

import { useCartPage } from "@/features/cart/hooks/useCartPage";
import { CartWarningBanner } from "@/features/cart/ui/CartWarningBanner";
import { CartSummary } from "@/features/cart/ui/CartSummary";
import { useAuth } from "@/shared/hooks/useAuth";

import styles from "./CartPage.module.scss";
import { Header } from "@/widgets/Header/Header";
import { Button } from "@/shared/ui/Button/Button";
import { useAuthModal } from "@/shared/hooks/useAuthModal";
import { useNavigate } from "react-router-dom";
import { RightLongIcon } from "@/assets/icons";
import { CartCard } from "@/features/cart/ui/CartCard";

export function CartPage() {
  useEffect(() => {
    document.title = "Корзина | CoolSpot";
  }, []);

  const { positions, selectedPrice, selectedCount, discount, hasWarnings } =
    useCartPage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { open } = useAuthModal();

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.messageContainer}>
            <h2 className={styles.messageTitle}>
              Войдите или зарегистрируйтесь
            </h2>

            <Button
              variant="primary"
              text="Войти в аккаунт"
              onClick={open}
              className={styles.btn}
            />
          </div>
        </main>
      </>
    );
  }

  if (!positions.length) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.messageContainer}>
            <h2 className={styles.messageTitle}>В корзине ничего нет</h2>

            <Button
              variant="primary"
              text="Перейти в меню"
              rightIcon={<RightLongIcon />}
              onClick={() => navigate("/menu")}
              className={styles.btn}
            />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.list}>
            {hasWarnings && <CartWarningBanner />}
            {positions.map((position) => (
              <CartCard
                key={position.dish.id}
                position={position}
                className={styles.card}
              />
            ))}
          </div>

          <aside className={styles.summary}>
            <CartSummary
              selectedPrice={selectedPrice}
              selectedCount={selectedCount}
              discount={discount}
            />
          </aside>
        </div>
      </main>
    </>
  );
}
