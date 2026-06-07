import { useNavigate } from "react-router-dom";

import styles from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>404</h1>

      <p className={styles.description}>Страница не найдена</p>

      <button
        type="button"
        className={styles.button}
        onClick={() => navigate("/")}
      >
        На главную
      </button>
    </main>
  );
};
