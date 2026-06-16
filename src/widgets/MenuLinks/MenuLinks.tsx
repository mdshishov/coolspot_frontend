import { NavLink } from "react-router-dom";
import { clsx } from "clsx";

import styles from "./MenuLinks.module.scss";
import type { MenuLink } from "@/features/menu/model/menu.types";

type Props = {
  items: MenuLink[];
};

const images = import.meta.glob("@/assets/images/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function getImage(slug: string) {
  return images[`/src/assets/images/${slug}.png`] ?? "";
}

export function MenuLinks({ items }: Props) {
  return (
    <nav className={styles.links}>
      {items.map((item) => (
        <NavLink
          key={item.slug}
          to={`/menu/${item.slug}`}
          className={({ isActive }) =>
            clsx(styles.link, isActive && styles.active)
          }
        >
          <img src={getImage(item.slug)} alt="" className={styles.image} />
          <span className={styles.text}>{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
}
