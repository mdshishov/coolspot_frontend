import { useState } from "react";
import { clsx } from "clsx";
import styles from "./Input.module.scss";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errors?: string | string[];
  rightSlot?: React.ReactNode;
  forceFloating?: boolean;
};

export function Input({
  label,
  errors,
  rightSlot,
  forceFloating,
  value,
  className = "",
  onChange,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const errorsArr = Array.isArray(errors) ? errors : errors ? [errors] : [];
  const hasValue = value !== undefined && String(value).length > 0;
  const floating = forceFloating || focused || hasValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={clsx(styles.field, className)}>
      <div
        className={clsx(styles.inputWrapper, errorsArr.length && styles.error)}
      >
        <input
          {...props}
          value={value}
          className={clsx(styles.input, rightSlot && styles.rightActive)}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {rightSlot && floating && (
          <div className={styles.rightSlot}>{rightSlot}</div>
        )}

        <label
          className={clsx(
            styles.label,
            floating && styles.floating,
            focused && styles.focused,
          )}
        >
          {label}
        </label>
      </div>

      {!!errorsArr.length &&
        errorsArr.map((e) => (
          <div key={e} className={styles.errors}>
            {e}
          </div>
        ))}
    </div>
  );
}
