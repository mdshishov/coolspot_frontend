import { useContext } from "react";

import { AuthContext } from "@/app/providers/auth/AuthProvider";

export function useAuth() {
  return useContext(AuthContext);
}
