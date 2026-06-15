import { useContext } from "react";

import { AuthModalContext } from "@/app/providers/auth-modal/AuthModalProvider";

export function useAuthModal() {
  return useContext(AuthModalContext);
}
