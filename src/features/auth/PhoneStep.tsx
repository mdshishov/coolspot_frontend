import { IMaskInput } from "react-imask";

import type { PhoneStepProps } from "./auth.types";
import { FormFieldError } from "@/shared/ui/FormField/FormFieldError";
import { isPhoneComplete } from "./phone.utils";

export function PhoneStep({
  phone,
  loading,
  errors,
  onChange,
  onSubmit,
}: PhoneStepProps) {
  return (
    <div>
      <h2>Вход или регистрация</h2>

      <IMaskInput
        mask="{+7} 000 000-00-00"
        value={phone}
        onAccept={(value) => onChange(String(value))}
      />
      <FormFieldError errors={errors} />

      <button
        type="button"
        disabled={!isPhoneComplete(phone) || loading}
        onClick={onSubmit}
      >
        Продолжить
      </button>
    </div>
  );
}
