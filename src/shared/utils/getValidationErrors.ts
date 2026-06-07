import axios from "axios";

import type { ValidationErrors } from "../types/api.types";

export function getValidationErrors(error: unknown): ValidationErrors {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 400) {
      return error.response.data ?? {};
    }
  }

  return {};
}
