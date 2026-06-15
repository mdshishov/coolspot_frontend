import { clsx } from "clsx";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";
import { LoadingIcon } from "@/assets/icons";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "border";
  loading?: boolean;
  text?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
};

export function Button({
  variant = "primary",
  loading,
  text,
  rightIcon,
  leftIcon,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const ClassName = clsx(
    styles.button,
    styles[variant],
    !text && styles.onlyIcon,
    className,
  );

  if (loading)
    return (
      <button className={ClassName} type={type} {...props} disabled={true}>
        <LoadingIcon />
      </button>
    );

  return (
    <button className={ClassName} type={type} {...props}>
      {leftIcon}
      {text && <span>{text}</span>}
      {children}
      {rightIcon}
    </button>
  );
}
