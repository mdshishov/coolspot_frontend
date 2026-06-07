import { useState } from "react";

import { authApi } from "@/app/providers/auth/auth.api";
import type { AuthStep } from "./auth.types";
import type { AuthFormErrors } from "@/shared/types/api.types";
import { getValidationErrors } from "@/shared/utils/getValidationErrors";
import { useToast } from "@/shared/hooks/useToast";
import { showApiError } from "@/shared/utils/showApiError";

import { PhoneStep } from "./PhoneStep";
import { LoginStep } from "./LoginStep";
import { RegisterStep } from "./RegisterStep";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: Props) {
  const { showError } = useToast();
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthFormErrors>({});

  if (!isOpen) {
    return null;
  }

  const handlePhoneSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);

      const result = await authApi.checkPhone(phone);
      if (result.exists) {
        setStep("login");
        return;
      }

      setStep("register");
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

  const handleClose = () => {
    setStep("phone");
    setPhone("");
    setErrors({});
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" onClick={handleClose}>
          ×
        </button>

        {step === "phone" && (
          <PhoneStep
            phone={phone}
            loading={loading}
            errors={errors.phone}
            onChange={setPhone}
            onSubmit={handlePhoneSubmit}
          />
        )}

        {step === "login" && (
          <LoginStep
            phone={phone}
            onBack={() => {
              setErrors({});
              setStep("phone");
            }}
            onSuccess={handleClose}
          />
        )}

        {step === "register" && (
          <RegisterStep
            phone={phone}
            onBack={() => {
              setErrors({});
              setStep("phone");
            }}
            onSuccess={handleClose}
          />
        )}
      </div>
    </div>
  );
}
