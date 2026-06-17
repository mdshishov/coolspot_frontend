import { Routes, Route } from "react-router-dom";

import { MenuPage } from "@/pages/MenuPage/MenuPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { MainPage } from "@/pages/MainPage/MainPage";
import { CartPage } from "@/pages/CartPage/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage/CheckoutPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/menu/:categorySlug" element={<MenuPage />} />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
