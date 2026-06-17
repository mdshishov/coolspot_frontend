import { useCartPage } from "@/features/cart/hooks/useCartPage";
import { useCheckout } from "@/features/order/hooks/useCheckout";
import type { CreateOrderResponse } from "@/features/order/model/order.types";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button/Button";
import { CheckoutSummary } from "@/features/order/ui/CheckoutSummary";
import { Header } from "@/widgets/Header/Header";
import styles from "./CheckoutPage.module.scss";
import { LeftIcon } from "@/assets/icons/LeftIcon";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { RightLongIcon } from "@/assets/icons/RightLongIcon";
import { OrderDetails } from "@/shared/ui/OrderDetails/OrderDetails";

export function CheckoutPage() {
  const { positions } = useCartPage();
  const navigate = useNavigate();
  const { loading, submit } = useCheckout();

  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [order, setOrder] = useState<CreateOrderResponse | null>(null);

  const handleSubmit = async () => {
    const result = await submit(address, comment);

    if (!result?.success) {
      setConfirmOpen(true);
      return;
    }

    setOrder(result.order as CreateOrderResponse);
  };

  if (order) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <h2 className={styles.pageTitle}>Благодарим за заказ!</h2>
          <p className={styles.tooltip}>
            Его статус и статус других заказом можно посмотреть в личном
            кабинете.
          </p>
          <Button
            className={styles.toOrdersBtn}
            variant="primary"
            text="К моим заказам"
            rightIcon={<RightLongIcon />}
            onClick={() => navigate("/profile")}
          />

          <div className={styles.content}>
            <OrderDetails className={styles.orderDetails} order={order} />
          </div>
        </main>
        {confirmOpen && (
          <ConfirmModal
            title="Корзина изменилась"
            text="Во время оформления некоторые позиции были изменены. Проверьте корзину ещё раз."
            confirmText="Вернуться в корзину"
            onConfirm={() => navigate("/cart")}
          />
        )}
      </>
    );
  }

  if (positions.filter((p) => p.is_selected).length === 0)
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.messageContainer}>
            <h2 className={styles.messageTitle}>
              У вас не выбрано ни одной позиции для заказа
            </h2>
            <Button
              variant="primary"
              text="Перейти в корзину"
              rightIcon={<RightLongIcon />}
              onClick={() => navigate("/cart")}
              className={styles.btn}
            />
          </div>
        </main>
      </>
    );

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h2 className={styles.pageTitle}>Оформление заказа</h2>
        <button className={styles.backBtn} onClick={() => navigate("/cart")}>
          <LeftIcon />
          <span>Назад</span>
        </button>

        <div className={styles.content}>
          <div className={styles.inputs}>
            <TextArea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Адрес"
            />

            <TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              label="Комментарий"
            />
          </div>

          <CheckoutSummary
            className={styles.summary}
            positions={positions.filter((p) => p.is_selected)}
          />

          <Button
            variant="primary"
            text="Подтвердить"
            loading={loading}
            disabled={!address.trim()}
            onClick={handleSubmit}
          />
        </div>
      </main>
      {confirmOpen && (
        <ConfirmModal
          title="Корзина изменилась"
          text="Во время оформления некоторые позиции были изменены. Проверьте корзину ещё раз."
          confirmText="Вернуться в корзину"
          onConfirm={() => navigate("/cart")}
        />
      )}
    </>
  );
}
