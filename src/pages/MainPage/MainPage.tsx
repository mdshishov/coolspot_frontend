import { Button } from "@/shared/ui/Button/Button";
import styles from "./MainPage.module.css";
import { RightLongIcon } from "@/assets/icons";

export function MainPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>{"Сайт временно недоступен".toUpperCase()}</h1>
        <p>
          Ведутся работы над улучшением визуальной составляющей. Вы всё ещё
          можете воспользоваться <a href="/admin">панелью администратора</a> или{" "}
          <a href="/api/docs">API-документацией</a>.
        </p>
        <div>
          <Button
            className={styles.noFlexGrow}
            onClick={() => (window.location.href = "/admin")}
            style={{ marginBottom: "0.5rem" }}
          >
            <span>{"Панель администратора".toUpperCase()}</span>
            <RightLongIcon />
          </Button>
          <Button
            variant="secondary"
            className={styles.noFlexGrow}
            onClick={() => (window.location.href = "/api/docs")}
          >
            <span>{"API-документация".toUpperCase()}</span>
            <RightLongIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
