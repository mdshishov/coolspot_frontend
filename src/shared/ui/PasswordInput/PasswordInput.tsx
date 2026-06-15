import { useState } from "react";

import { Input } from "../Input/Input";
import type { InputProps } from "../Input/Input";
import { EyeClosedIcon, EyeOpenIcon } from "@/assets/icons";

import styles from "./PasswordInput.module.scss";

type PasswordInputProps = Omit<InputProps, "type" | "rightSlot">;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      autoComplete="current-password"
      rightSlot={
        <button
          type="button"
          onClick={toggleVisibility}
          className={styles.toggleBtn}
          aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
        >
          {visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>
      }
    />
  );
}
