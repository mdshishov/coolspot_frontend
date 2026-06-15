import { clsx } from "clsx";

import type { PhoneStepProps } from "./auth.types";
import { isPhoneComplete } from "./phone.utils";
import { PhoneInput } from "@/shared/ui/PhoneInput/PhoneInput";
import { Button } from "@/shared/ui/Button/Button";
import { RightLongIcon } from "@/assets/icons";

import styles from "./Auth.module.scss";

export function PhoneStep({
  phone,
  loading,
  onChange,
  onSubmit,
}: PhoneStepProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(styles.form, styles.phoneForm)}
    >
      <PhoneInput
        autoFocus
        label="Телефон"
        value={phone}
        onChange={onChange}
        name="phone"
      ></PhoneInput>

      <Button
        variant="primary"
        type="submit"
        text="Продолжить"
        rightIcon={<RightLongIcon />}
        loading={loading}
        disabled={!isPhoneComplete(phone)}
      />
    </form>
  );
}
