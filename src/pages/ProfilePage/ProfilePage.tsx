import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProfilePage.module.scss";

import { Header } from "@/widgets/Header/Header";

import { Button } from "@/shared/ui/Button/Button";

import { useAuth } from "@/shared/hooks/useAuth";
import { useAuthModal } from "@/shared/hooks/useAuthModal";

import { useProfile } from "@/features/profile/hooks/useProfile";
import { OrderDetails } from "@/shared/ui/OrderDetails/OrderDetails";
import { LeftIcon } from "@/assets/icons/LeftIcon";

export function ProfilePage() {
  useEffect(() => {
    document.title = "Личный кабинет | CoolSpot";
  }, []);

  const navigate = useNavigate();

  const { isInitialized: authInitialized, isAuthenticated, logout } = useAuth();

  const { open } = useAuthModal();

  const { profile, orders, loading } = useProfile();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  if (!authInitialized || loading) {
    return (
      <>
        <Header />

        <main className={styles.main} />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header />

        <main className={styles.main}>
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Войдите в аккаунт</h2>

            <Button variant="primary" text="Войти" onClick={open} />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.profile}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              {profile?.full_name?.charAt(0).toUpperCase() ?? "?"}
            </div>

            <div className={styles.info}>
              <h1 className={styles.name}>{profile?.full_name}</h1>
              <div className={styles.secondary}>{profile?.phone}</div>
              <button className={styles.exitBtn} onClick={handleLogout}>
                <LeftIcon />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </section>

        <section className={styles.orders}>
          <h2 className={styles.sectionTitle}>История заказов</h2>

          {orders.length === 0 ? (
            <div className={styles.emptyOrders}>
              <h3>У вас пока нет заказов</h3>

              <Button
                variant="primary"
                text="Перейти в меню"
                onClick={() => navigate("/menu")}
              />
            </div>
          ) : (
            <div className={styles.list}>
              {orders.map((order) => (
                <OrderDetails key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
