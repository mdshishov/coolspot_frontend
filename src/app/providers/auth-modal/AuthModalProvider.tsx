import { createContext, useCallback, useMemo, useState } from "react";

import type { ReactNode } from "react";

import { AuthModal } from "@/features/auth/AuthModal";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";

type AuthModalContextType = {
  open: () => void;
  close: () => void;
};

export const AuthModalContext = createContext<AuthModalContextType>(
  {} as AuthModalContextType,
);

type Props = { children: ReactNode };

export function AuthModalProvider({ children }: Props) {
  const [opened, setOpened] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}

      {opened && (
        <AuthModal
          onClose={close}
          onRegisterSuccess={() => setShowConfirm(true)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          title="Аккаунт успешно создан"
          text="Вы будете автоматически авторизованы в системе."
          confirmText="Понятно"
          onConfirm={() => setShowConfirm(false)}
        />
      )}
    </AuthModalContext.Provider>
  );
}
