import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/Overview";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import ManageProductPrices from "../pages/ManageProductPrices";
// protect middleware
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "products/add",
            element: <AddProduct />,
          },
          {
            path: "products/:id/prices",
            element: <ManageProductPrices />,
          },
          {
            path: "products/edit/:id",
            element: <EditProduct />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);