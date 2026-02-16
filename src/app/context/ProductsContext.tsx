import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../data/products";
import { fetchProductsFromGoogleSheets } from "../data/googleSheetsHelper";
import { products as fallbackProducts } from "../data/products";

type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

const REFRESH_INTERVAL_MS = 60_000; // 1 minute

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductsFromGoogleSheets();
      if (data.length > 0) {
        // Only replace state if fetched data has at least one image, so we don't
        // overwrite fallback (or previous good data) with empty-image data and make images "disappear"
        const hasAnyImage = data.some((p) => (p.mainImage || "").trim().length > 0);
        if (hasAnyImage) {
          setProducts(data);
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Periodic refresh so updated sheet data appears without reload
  useEffect(() => {
    const id = setInterval(load, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [load]);

  const value: ProductsContextValue = {
    products,
    loading,
    error,
    refresh: load,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return ctx;
}
