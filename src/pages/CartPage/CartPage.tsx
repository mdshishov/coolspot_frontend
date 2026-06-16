import { useEffect } from "react";

import { useCartPage } from "@/features/cart/hooks/useCartPage";
import { CartSummary } from "@/features/cart/ui/CartSummary";
import { useAuth } from "@/shared/hooks/useAuth";

import styles from "./CartPage.module.scss";
import { Header } from "@/widgets/Header/Header";
import { Button } from "@/shared/ui/Button/Button";
import { useAuthModal } from "@/shared/hooks/useAuthModal";
import { useNavigate } from "react-router-dom";
import { RightLongIcon, WarningIcon } from "@/assets/icons";
import { CartCard } from "@/features/cart/ui/CartCard";
import { useCart } from "@/shared/hooks/useCart";

export function CartPage() {
  useEffect(() => {
    document.title = "Корзина | CoolSpot";
  }, []);

  const {
    positions,
    selectedPrice,
    selectedCount,
    basePrice,
    discount,
    hasWarnings,
    isInitialized,
    loading,
  } = useCartPage();
  const { isAuthenticated, isInitialized: authInitialized } = useAuth();
  const { refreshCart } = useCart();

  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    }
  }, [isAuthenticated, refreshCart]);
  const navigate = useNavigate();
  const { open } = useAuthModal();

  if (!authInitialized || loading) {
    return (
      <>
        <Header />
        <main className={styles.main}></main>
      </>
    );
  }

  if (authInitialized && !isAuthenticated) {
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

  if (!loading && !positions.length) {
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
        <h2 className={styles.cartTitle}>Корзина</h2>
        <div className={styles.content}>
          <div className={styles.listSection}>
            <div className={styles.list}>
              {hasWarnings && (
                <div className={styles.warning}>
                  <WarningIcon></WarningIcon>
                  <span>
                    Некоторые позиции были изменены. Пожалуйста, проверьте
                    корзину перед оформлением заказа.
                  </span>
                </div>
              )}
              {positions
                .filter((position) => position.is_available)
                .map((position) => (
                  <CartCard
                    key={position.dish.id}
                    position={position}
                    className={styles.card}
                  />
                ))}
            </div>
            <div className={styles.list}>
              {positions
                .filter((position) => !position.is_available)
                .map((position) => (
                  <CartCard
                    key={position.dish.id}
                    position={position}
                    className={styles.card}
                  />
                ))}
            </div>
          </div>

          <aside className={styles.summary}>
            <CartSummary
              selectedPrice={selectedPrice}
              selectedCount={selectedCount}
              basePrice={basePrice}
              discount={discount}
            />
          </aside>
        </div>
      </main>
    </>
  );
}
