import axios from "axios";

type ShowError = (message: string) => void;

export function showApiError(error: unknown, showError: ShowError) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      showError("Произошла ошибка. Пожалуйста, попробуйте позже.");
      return;
    }

    if (error.response.status >= 500) {
      showError("Ошибка сервера");
      return;
    }
  }

  showError("Произошла ошибка");
}
