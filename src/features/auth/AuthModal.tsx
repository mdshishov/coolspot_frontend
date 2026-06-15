import { useState } from "react";

import { authApi } from "@/app/providers/auth/auth.api";
import type { AuthStep } from "./auth.types";
import { useToast } from "@/shared/hooks/useToast";
import { showApiError } from "@/shared/utils/showApiError";
import { PhoneStep } from "./PhoneStep";
import { LoginStep } from "./LoginStep";
import { RegisterStep } from "./RegisterStep";
import { Overlay } from "@/shared/ui/Overlay/Overlay";
import { LeftIcon } from "@/assets/icons";
import { formatPhone } from "./phone.utils";

import styles from "./Auth.module.scss";

type Props = {
  onClose: () => void;
  onRegisterSuccess: () => void;
};

export function AuthModal({ onClose, onRegisterSuccess }: Props) {
  const { showError, showSuccess } = useToast();
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = async () => {
    try {
      setLoading(true);

      const result = await authApi.checkPhone(phone);
      if (result.exists) {
        setStep("login");
        return;
      }

      setStep("register");
    } catch (error) {
      showApiError(error, showError);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("phone");
    setPhone("");
    onClose();
  };
  const handleRegisterSuccess = () => {
    handleClose();
    onRegisterSuccess();
  };
  const handleLoginSuccess = () => {
    handleClose();
    showSuccess("Вы вошли в аккаунт.");
  };

  const backBtn = (
    <button className={styles.backBtn} onClick={() => setStep("phone")}>
      <LeftIcon />
      <span>Назад</span>
    </button>
  );

  return (
    <Overlay onClose={handleClose}>
      <div className={styles.content}>
        {step === "phone" && (
          <>
            <h2 className={styles.title}>Вход или регистрация</h2>
            <PhoneStep
              phone={phone}
              loading={loading}
              onChange={setPhone}
              onSubmit={handlePhoneSubmit}
            />
          </>
        )}

        {step === "login" && (
          <>
            <div>
              <h2 className={styles.title}>Вход</h2>
              {backBtn}
              <p className={styles.tooltip}>
                Введте пароль для номера{" "}
                <span className={styles.tooltipAccent}>
                  {formatPhone(phone)}
                </span>
                {"."}
              </p>
            </div>
            <LoginStep phone={phone} onSuccess={handleLoginSuccess} />
          </>
        )}

        {step === "register" && (
          <>
            <div>
              <h2 className={styles.title}>Регистрация</h2>
              {backBtn}
              <p className={styles.tooltip}>
                Похоже, для номера{" "}
                <span className={styles.tooltipAccent}>
                  {formatPhone(phone)}
                </span>{" "}
                ещё нет аккаунта. Заполните поля ниже, чтобы завершить
                регистрацию.
              </p>
            </div>
            <RegisterStep phone={phone} onSuccess={handleRegisterSuccess} />
          </>
        )}
      </div>
    </Overlay>
  );
}
