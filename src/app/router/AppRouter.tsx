import { Routes, Route, Navigate } from "react-router-dom";

import { MenuPage } from "@/pages/MenuPage/MenuPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
// import { MainPage } from "@/pages/MainPage/MainPage";
import { CartPage } from "@/pages/CartPage/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage/CheckoutPage";
// import { ProfileOrdersPage } from "@/pages/ProfileOrdersPage/ProfileOrdersPage";
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/menu" replace />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/menu/:categorySlug" element={<MenuPage />} />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      <Route path="*" element={<NotFoundPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};
