import { createContext, useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { ToastType, ToastItem } from "@/shared/types/toast.types";
import { ToastContainer } from "@/shared/ui/toast/ToastContainer";

type ToastContextType = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
};

export const ToastContext = createContext({} as ToastContextType);

type Props = { children: ReactNode };

export function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string) => {
      const id = crypto.randomUUID();
      const toast: ToastItem = { id, type, message };

      setToasts((current) => [...current, toast]);
      setTimeout(() => removeToast(id), 5000);
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({
      showSuccess: (message: string) => addToast("success", message),
      showError: (message: string) => addToast("error", message),
      showInfo: (message: string) => addToast("info", message),
    }),
    [addToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}
