import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.scss";
import App from "./App.tsx";
import { setupInterceptors } from "./app/api/setupInterceptors";

import { AuthProvider } from "./app/providers/auth/AuthProvider.tsx";
import { ToastProvider } from "./app/providers/toast/ToastProvider.tsx";
import { CartProvider } from "./app/providers/cart/CartProvider.tsx";
import { AuthModalProvider } from "./app/providers/auth-modal/AuthModalProvider.tsx";

setupInterceptors();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastProvider>
      <AuthProvider>
        <AuthModalProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthModalProvider>
      </AuthProvider>
    </ToastProvider>
  </BrowserRouter>,
);
