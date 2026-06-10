import { useState } from "react";
import { clsx } from "clsx";

import styles from "./Header.module.scss";
// import { useAuth } from "@/shared/hooks/useAuth";
// import { useCart } from "@/shared/hooks/useCart";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { Logo, ProfileIcon } from "@/assets/icons";
import { NavLink } from "react-router-dom";
import { MenuIcon } from "@/assets/icons/MenuIcon";
import { SearchIcon } from "@/assets/icons/SearchIcon";

export function Header() {
  // const authState = useAuth();
  // const cartState = useCart();
  const isScrolled = useScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={clsx(styles.header, isScrolled && styles.scrolled)}>
      <nav className={clsx(styles.nav, styles.desktopNav)}>
        <NavLink to="/" className={styles.link}>
          Главная
        </NavLink>
        <NavLink to="/menu" className={styles.link}>
          Меню
        </NavLink>
      </nav>

      <button
        className={styles.burger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MenuIcon className={styles.icon} />
      </button>

      <NavLink to="/">
        <Logo className={styles.logo} />
      </NavLink>

      <div className={styles.actions}>
        <button className={styles.search}>
          <SearchIcon className={styles.icon} />
        </button>
        <button
          className={styles.login}
          // onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <ProfileIcon className={styles.icon} />
          <span>Войти</span>
        </button>
      </div>

      {/* {isMenuOpen && (
        <nav className={styles.mobileNav}>
          <a href="/">Главная</a>
          <a href="/about">Меню</a>
        </nav>
      )} */}
    </header>
  );
}
