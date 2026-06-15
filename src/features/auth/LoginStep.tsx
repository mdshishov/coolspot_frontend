import { useState } from "react";
import axios from "axios";

import type { LoginStepProps } from "./auth.types";
import { useAuth } from "@/shared/hooks/useAuth";
import { showApiError } from "@/shared/utils/showApiError";
import { useToast } from "@/shared/hooks/useToast";
import { PasswordInput } from "@/shared/ui/PasswordInput/PasswordInput";
import { Button } from "@/shared/ui/Button/Button";

import styles from "./Auth.module.scss";

export function LoginStep({ phone, onSuccess }: LoginStepProps) {
  const { login } = useAuth();
  const { showError } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const validatePassword = (value: string): string => {
    if (!value.trim()) return "Заполните поле";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePassword(password)) return;

    try {
      setPasswordError("");
      setLoading(true);
      await login(phone, password);
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setPasswordError("Неверный пароль");
        return;
      }
      showApiError(error, showError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <PasswordInput
        autoFocus
        value={password}
        label="Пароль"
        errors={passwordError}
        onChange={(event) => {
          const password = event.target.value;
          setPassword(password);
          if (passwordError) setPasswordError(validatePassword(password));
        }}
        onBlur={() => setPasswordError(validatePassword(password))}
      ></PasswordInput>

      <Button
        variant="primary"
        type="submit"
        text="Войти в аккаунт"
        loading={loading}
      />
    </form>
  );
}
