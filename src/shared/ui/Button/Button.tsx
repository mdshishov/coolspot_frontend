import { clsx } from "clsx";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  text?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
};

export function Button({
  variant = "primary",
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

  return (
    <button className={ClassName} type={type} {...props}>
      {leftIcon}
      {text && <span>{text}</span>}
      {children}
      {rightIcon}
    </button>
  );
}
