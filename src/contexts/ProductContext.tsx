import { createContext, useContext } from 'react';
import type { Product } from '../types/product.type';
import type { ProductFormValues } from '../schemas/product.schema';

export interface Pagination {
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export interface LinkOffer {
    _id: string;
    productId: string;
    storeName: 'Amazon' | 'Noon' | 'Sephora' | 'Ulta' | 'Jumia' | 'AliExpress';
    country: 'EG' | 'KSA' | 'UAE' | 'US';
    url: string;
    priceSelector: string;
    currentPrice: number;
    lastPrice: number;
    currency: 'EGP' | 'SAR' | 'AED' | 'USD';
    lastUpdated: string;
}

export interface ProductContextType {
    products: Product[];
    loading: boolean;
    pagination: Pagination; 
    loadProducts: (page?: number, limit?: number) => Promise<void>; 
    addProduct: (productData: ProductFormValues) => Promise<Product>;
    updateProduct: (id: string, product: Partial<ProductFormValues>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    
    // actions
    getOffersByProduct: (productId: string) => Promise<LinkOffer[]>;
    addLinkOffer: (offerData: Omit<LinkOffer, '_id' | 'currentPrice' | 'lastPrice' | 'lastUpdated'>) => Promise<void>;
    deleteLinkOffer: (id: string) => Promise<void>;
    triggerScraper: () => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) throw new Error('useProduct must be used within a ProductProvider');
    return context;
}