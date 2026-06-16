import { useNavigate } from "react-router-dom";

import styles from "./NotFoundPage.module.scss";
import { Header } from "@/widgets/Header/Header";
import { Button } from "@/shared/ui/Button/Button";
import { LeftLongIcon } from "@/assets/icons";
import { useEffect } from "react";

export const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404 | CoolSpot";
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h2 className={styles.title}>Не удалось найти страницу</h2>

        <Button
          variant="primary"
          text="На главную"
          leftIcon={<LeftLongIcon />}
          onClick={() => navigate("/")}
          className={styles.btn}
        />
      </main>
    </>
  );
};
