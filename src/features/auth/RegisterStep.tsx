import { useState } from "react";

import type { RegisterStepProps } from "./auth.types";
import type { AuthFormErrors } from "@/shared/types/api.types";
import { getValidationErrors } from "@/shared/utils/getValidationErrors";
import { useAuth } from "@/shared/hooks/useAuth";
import { useToast } from "@/shared/hooks/useToast";
import { showApiError } from "@/shared/utils/showApiError";
import { PasswordInput } from "@/shared/ui/PasswordInput/PasswordInput";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";

import styles from "./Auth.module.scss";

export function RegisterStep({ phone, onSuccess }: RegisterStepProps) {
  const { register } = useAuth();
  const { showError } = useToast();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const setFieldError = (
    field: keyof AuthFormErrors,
    value?: string | string[],
  ) => {
    setErrors((prev) => ({ ...prev, [field]: value }));
  };

  const validateName = (value: string): string | undefined => {
    const NAME_PATTERN =
      /^[A-Za-zА-Яа-яЁё]+(?:-[A-Za-zА-Яа-яЁё]+)?(?: [A-Za-zА-Яа-яЁё]+(?:-[A-Za-zА-Яа-яЁё]+)?){0,2}$/;

    const normalized = value.trim();

    if (!value.trim()) return "Заполните поле";
    if (!NAME_PATTERN.test(normalized)) return "Некорректное значение";
  };

  const validatePassword = (value: string): string[] | undefined => {
    const result: string[] = [];

    if (value.length < 8) result.push("Минимум 8 символов");
    if (!/\d/.test(value)) result.push("Должен содержать хотя бы одну цифру");
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value))
      result.push("Должен содержать хотя бы один специальный символ");

    return result.length ? result : undefined;
  };

  const validatePassword2 = (
    pass: string,
    pass2: string,
  ): string | undefined => {
    if (!pass2 || pass !== pass2) {
      return "Пароли не совпадают";
    }
  };

  const validateForm = () => {
    const nextErrors: AuthFormErrors = {};
    const nameError = validateName(fullName);
    const passwordError = validatePassword(password);
    const repeatError = validatePassword2(password, password2);

    if (nameError) nextErrors.full_name = nameError;
    if (passwordError) nextErrors.password = passwordError;
    if (repeatError) nextErrors.password2 = repeatError;
    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        autoFocus
        value={fullName}
        label="Полное имя"
        name="full_name"
        errors={errors.full_name}
        onChange={(event) => {
          const fullName = event.target.value;
          setFullName(fullName);
          if (errors.password)
            setFieldError("full_name", validateName(fullName));
        }}
        onBlur={() => setFieldError("full_name", validateName(fullName))}
      />

      <PasswordInput
        value={password}
        className={styles.password}
        errors={errors.password}
        label="Пароль"
        name="password"
        onChange={(event) => {
          const password = event.target.value;
          setPassword(password);
          if (errors.password)
            setFieldError("password", validatePassword(password));
          if (password2 || errors.password2)
            setFieldError("password2", validatePassword2(password, password2));
        }}
        onBlur={() => setFieldError("password", validatePassword(password))}
      />
      <PasswordInput
        value={password2}
        className={styles.password2}
        errors={errors.password2}
        label="Повторите пароль"
        name="password2"
        onChange={(event) => {
          const password2 = event.target.value;
          setPassword2(password2);
          if (errors.password2)
            setFieldError("password2", validatePassword2(password, password2));
        }}
        onBlur={() =>
          setFieldError("password2", validatePassword2(password, password2))
        }
      />

      <Button
        variant="primary"
        type="submit"
        text="Создать аккаунт"
        loading={loading}
      />
    </form>
  );
}
