import { Routes, Route } from "react-router-dom";

import { MenuPage } from "@/pages/MenuPage/MenuPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/menu/:categorySlug" element={<MenuPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
