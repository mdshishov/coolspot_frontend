import { Input, type InputProps } from "../Input/Input";

type PhoneInputProps = Omit<InputProps, "value" | "onChange"> & {
  value?: string;
  onChange?: (value: string) => void;
};

function normalize(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits.length) return "7";
  if (digits.startsWith("8")) return `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) return `7${digits}`;

  return digits.slice(0, 11);
}

function formatPhone(value: string) {
  const digits = normalize(value);

  let result = "+7";

  if (digits.length > 1) result += ` (${digits.slice(1, 4)}`;
  if (digits.length > 4) result += `) ${digits.slice(4, 7)}`;
  if (digits.length > 7) result += `-${digits.slice(7, 9)}`;
  if (digits.length > 9) result += `-${digits.slice(9, 11)}`;

  return result;
}

export function PhoneInput({
  value = "7",
  onChange,
  name,
  ...props
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = normalize(e.currentTarget.value);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget.selectionStart ?? 0;
    if ((e.key === "Backspace" || e.key === "Delete") && input <= 2) {
      e.preventDefault();
    }
  };

  return (
    <Input
      {...props}
      value={formatPhone(value)}
      forceFloating
      type="tel"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      name={name}
    />
  );
}
