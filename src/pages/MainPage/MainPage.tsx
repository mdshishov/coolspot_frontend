import { Button } from "@/shared/ui/Button/Button";
import styles from "./MainPage.module.scss";
import { RightLongIcon } from "@/assets/icons";
import { Header } from "@/widgets/Header/Header";
import { useEffect } from "react";

export function MainPage() {
  useEffect(() => {
    document.title = "Главная | CoolSpot";
  }, []);

  return (
    <>
      <Header></Header>
      <div className={styles.page}>
        <div className={styles.container}>
          <h2>{"Сайт временно недоступен"}</h2>
          <p>
            Ведутся работы над улучшением визуальной составляющей. Вы всё ещё
            можете воспользоваться <a href="/admin">панелью администратора</a>{" "}
            или <a href="/api/docs">API-документацией</a>.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <Button
              className={styles.noFlexGrow}
              onClick={() => (window.location.href = "/admin")}
              style={{ marginBottom: "1rem" }}
              text="Панель администратора"
              rightIcon={<RightLongIcon />}
            ></Button>
            <Button
              variant="secondary"
              className={styles.noFlexGrow}
              text="API-документация"
              rightIcon={<RightLongIcon />}
              onClick={() => (window.location.href = "/api/docs")}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
