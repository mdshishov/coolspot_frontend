import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { setupInterceptors } from "./app/api/setupInterceptors";

import { AuthProvider } from "./app/providers/auth/AuthProvider.tsx";
import { ToastProvider } from "./app/providers/toast/ToastProvider.tsx";
import { CartProvider } from "./app/providers/cart/CartProvider.tsx";

setupInterceptors();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  </BrowserRouter>,
);
