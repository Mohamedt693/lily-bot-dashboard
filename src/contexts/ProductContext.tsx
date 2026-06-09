import { createContext, useContext } from 'react';
import type { Product } from '../types/product.type';
import type { ProductFormValues } from '../schemas/product.schema';

export interface Pagination {
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export interface ProductContextType {
    products: Product[];
    loading: boolean;
    pagination: Pagination; 
    loadProducts: (page?: number, limit?: number) => Promise<void>; 
    addProduct: (product: ProductFormValues) => Promise<void>;
    updateProduct: (id: string, product: Partial<ProductFormValues>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) throw new Error('useProduct must be used within a ProductProvider');
    return context;
}