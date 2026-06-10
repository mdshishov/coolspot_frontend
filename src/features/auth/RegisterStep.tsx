import { useState } from "react";

import type { RegisterStepProps } from "./auth.types";
import type { AuthFormErrors } from "@/shared/types/api.types";
import { FormFieldError } from "@/shared/ui/FormField/FormFieldError";
import { getValidationErrors } from "@/shared/utils/getValidationErrors";
import { useAuth } from "@/shared/hooks/useAuth";
import { useToast } from "@/shared/hooks/useToast";
import { showApiError } from "@/shared/utils/showApiError";

export function RegisterStep({ phone, onBack, onSuccess }: RegisterStepProps) {
  const { register } = useAuth();
  const { showError } = useToast();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const handleSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);
      await register(phone, fullName, password);
      onSuccess();
    } catch (error) {
      const validationErrors = getValidationErrors(error);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
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

      <h2>Регистрация</h2>

      <input
        value={fullName}
        placeholder="Имя"
        onChange={(event) => setFullName(event.target.value)}
      />
      <FormFieldError errors={errors.full_name} />

      <input
        type="password"
        value={password}
        placeholder="Пароль"
        onChange={(event) => setPassword(event.target.value)}
      />
      <FormFieldError errors={errors.password} />

      <button disabled={loading} onClick={handleSubmit}>
        Зарегистрироваться
      </button>
    </div>
  );
}
