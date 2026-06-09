import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.jsx";
import "./index.css";
// Importing toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Importing contexts and providers
import { AuthProvider } from './providers/AuthProvider.js';
import { ProductProvider } from "./providers/ProductProvider.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          toastClassName="bg-emerald-500 text-white font-bold"
          className="text-white"
          progressClassName="bg-white"
        />
        <RouterProvider router={router} />
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
);
