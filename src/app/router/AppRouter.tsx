import { Routes, Route } from "react-router-dom";

// import { MenuPage } from "@/pages/MenuPage/MenuPage";
// import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { MainPage } from "@/pages/MainPage/MainPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/menu" element={<MainPage />} />
      <Route path="/menu/:categorySlug" element={<MainPage />} />

      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};
