import { useContext } from "react";

import { ToastContext } from "@/app/providers/toast/ToastProvider";

export function useToast() {
  return useContext(ToastContext);
}
