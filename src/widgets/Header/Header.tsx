import { useState, type ReactNode } from "react";
import { clsx } from "clsx";

import styles from "./Header.module.scss";
import { useAuth } from "@/shared/hooks/useAuth";
import { useCart } from "@/shared/hooks/useCart";
import { useAuthModal } from "@/shared/hooks/useAuthModal";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { CartIcon, Logo, ProfileIcon } from "@/assets/icons";
import { NavLink } from "react-router-dom";
import { MenuIcon } from "@/assets/icons/MenuIcon";

type Props = { children?: ReactNode };

export function Header({ children }: Props) {
  const { isInitialized, isAuthenticated } = useAuth();
  const { totalDishes } = useCart();
  const isScrolled = useScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { open } = useAuthModal();

  return (
    <header
      className={clsx(
        styles.header,
        isScrolled && styles.scrolled,
        children && styles.hasChildren,
      )}
    >
      <div className={styles.headerBase}>
        <nav className={clsx(styles.nav, styles.desktopNav)}>
          {/* <NavLink to="/" className={styles.link}>
            Главная
          </NavLink> */}
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
          {/* <button className={styles.search}>
            <SearchIcon className={styles.icon} />
          </button> */}
          {isAuthenticated && (
            <>
              <NavLink to="/cart" className={styles.link}>
                <div className={styles.cart}>
                  <CartIcon className={styles.icon} />
                  {isAuthenticated && totalDishes > 0 && (
                    <div className={styles.cartCount}>{totalDishes}</div>
                  )}
                </div>
              </NavLink>
              <NavLink to="/profile" className={styles.link}>
                <ProfileIcon className={styles.icon} />
              </NavLink>
            </>
          )}
          {isInitialized && !isAuthenticated && (
            <button className={styles.login} onClick={open}>
              <ProfileIcon className={styles.icon} />
              <span>Войти</span>
            </button>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <nav className={styles.mobileNav}>
          {/* <NavLink to="/" className={styles.link}>
            Главная
          </NavLink> */}
          <NavLink to="/menu" className={styles.link}>
            Меню
          </NavLink>
        </nav>
      )}
      {children}
    </header>
  );
}
