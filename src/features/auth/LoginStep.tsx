import { useState } from "react";
import axios from "axios";

import type { LoginStepProps } from "./auth.types";
import { useAuth } from "@/shared/hooks/useAuth";
import { showApiError } from "@/shared/utils/showApiError";
import { useToast } from "@/shared/hooks/useToast";

export function LoginStep({ phone, onBack, onSuccess }: LoginStepProps) {
  const { login } = useAuth();
  const { showError } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async () => {
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
    <div>
      <button onClick={onBack}>Назад</button>
      <h2>Вход</h2>

      <p>{phone}</p>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {passwordError && <p>{passwordError}</p>}

      <button disabled={loading} onClick={handleSubmit}>
        Войти
      </button>
    </div>
  );
}
