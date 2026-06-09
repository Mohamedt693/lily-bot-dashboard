import { useState, useCallback, type ReactNode } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { toast } from "react-toastify";
// types
import type { ProductFormValues } from "../schemas/product.schema";
import type { Product } from "../types/product.type";

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const getHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("lily_bot_token")}`,
    }),
    [],
  );

  const loadProducts = useCallback(
    async (page: number = 1, limit: number = 10) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/api/dashboard/products?page=${page}&limit=${limit}`,
          {
            headers: getHeaders(),
          },
        );
        const result = await res.json();

        if (result.success) {
          setProducts(result.data.products);
          setPagination(result.data.pagination);
        }
      } catch {
        toast.error("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    },
    [API_URL, getHeaders],
  );

  const addProduct = useCallback(
    async (productData: ProductFormValues) => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/products`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(productData),
        });
        if (!res.ok)
          throw new Error("Error occurred while adding the product.");

        toast.success("Product added successfully!");
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    },
    [API_URL, getHeaders],
  );

  const updateProduct = useCallback(
    async (id: string, productData: Partial<ProductFormValues>) => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/products/${id}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(productData),
        });
        if (!res.ok)
          throw new Error("Error occurred while updating the product.");

        toast.success("Product updated successfully!");
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    },
    [API_URL, getHeaders],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/products/${id}`, {
          method: "DELETE",
          headers: getHeaders(),
        });
        if (!res.ok)
          throw new Error("Error occurred while deleting the product.");

        toast.success("Product deleted successfully!");
        await loadProducts();
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    },
    [API_URL, getHeaders, loadProducts],
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        pagination,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
