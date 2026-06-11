import { useState, useCallback, type ReactNode } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { toast } from "react-toastify";
// Types
import type { ProductFormValues } from "../schemas/product.schema";
import type { Product } from "../types/product.type";
import type { LinkOffer } from "../contexts/ProductContext";


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

  console.log(API_URL)

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
        
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Error occurred while adding the product.");
        }

        toast.success("Product added successfully! 🎉");
        await loadProducts(); 
        return result.data;  
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
        throw err;
      }
    },
    [API_URL, getHeaders, loadProducts],
  );

  const updateProduct = useCallback(
    async (id: string, productData: Partial<ProductFormValues>) => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/products/${id}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(productData),
        });
        
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message || "Error occurred while updating the product.");
        }

        toast.success("Product updated successfully!");
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

  const getProductById = useCallback(
    async (id: string): Promise<Product | null> => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/dashboard/products/${id}`, {
          headers: getHeaders(),
        });
        const result = await res.json();
        return (result.success ? result.data : null) as Product;
      } catch {
        toast.error("Failed to fetch product details.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [API_URL, getHeaders]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/products/${id}`, {
          method: "DELETE",
          headers: getHeaders(),
        });
        if (!res.ok) throw new Error("Error occurred while deleting the product.");

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


  const getOffersByProduct = useCallback(
    async (productId: string): Promise<LinkOffer[]> => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/link-offers/product/${productId}`, {
          headers: getHeaders(),
        });
        const result = await res.json();
        return result.success ? result.data : [];
      } catch {
        toast.error("Failed to fetch live marketplace offers.");
        return [];
      }
    },
    [API_URL, getHeaders],
  );


  const addLinkOffer = useCallback(
    async (offerData: Omit<LinkOffer, "_id" | "currentPrice" | "lastPrice" | "lastUpdated">) => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/link-offers/`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(offerData),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Error integrating marketplace link.");
        toast.success("Marketplace link integrated successfully! 🚀");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
        toast.error(msg);
        throw err;
      }
    },
    [API_URL, getHeaders],
  );


  const deleteLinkOffer = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/link-offers/${id}`, {
          method: "DELETE",
          headers: getHeaders(),
        });
        if (!res.ok) throw new Error("Error cutting marketplace connection.");
        toast.success("Marketplace link disconnected.");
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Error occurred.");
      }
    },
    [API_URL, getHeaders],
  );

  const triggerScraper = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/dashboard/link-offers/trigger-scraper`, {
        method: "POST",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Scraper execution failed.");
      toast.success("Live pricing synchronization completed! ⚡");
    } catch {
      toast.error("Failed to execute live synchronization.");
    }
  }, [API_URL, getHeaders]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        pagination,
        loadProducts,
        addProduct,
        getProductById,
        updateProduct,
        deleteProduct,
        getOffersByProduct,
        addLinkOffer,
        deleteLinkOffer,
        triggerScraper,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}