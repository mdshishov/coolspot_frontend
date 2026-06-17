import { useState } from "react";
import { clsx } from "clsx";
import styles from "./TextArea.module.scss";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    errors?: string | string[];
    forceFloating?: boolean;
  };

export function TextArea({
  label,
  errors,
  forceFloating,
  value,
  className = "",
  onChange,
  onFocus,
  onBlur,
  ...props
}: TextareaProps) {
  const [focused, setFocused] = useState(false);

  const errorsArr = Array.isArray(errors) ? errors : errors ? [errors] : [];
  const hasValue = value !== undefined && String(value).length > 0;
  const floating = forceFloating || focused || hasValue;

  return (
    <div className={clsx(styles.field, className)}>
      <div
        className={clsx(
          styles.textareaWrapper,
          errorsArr.length && styles.error,
        )}
      >
        <textarea
          {...props}
          value={value}
          className={styles.textarea}
          onChange={onChange}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />

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

      {errorsArr.map((e) => (
        <div key={e} className={styles.errors}>
          {e}
        </div>
      ))}
    </div>
  );
}
