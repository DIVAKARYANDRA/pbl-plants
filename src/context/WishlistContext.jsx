import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { loadFromSession, saveToSession } from "../utils/storage";

const STORAGE_KEY = "pbl-plants:wishlist:v1";
const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => loadFromSession(STORAGE_KEY, []));
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    saveToSession(STORAGE_KEY, items);
  }, [items]);

  const addItem = useCallback((productId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { productId, qty }];
    });
    setLastAdded(productId);
    window.clearTimeout(addItem._t);
    addItem._t = window.setTimeout(() => setLastAdded(null), 1800);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQty = useCallback((productId, qty) => {
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const isInWishlist = useCallback((productId) => items.some((i) => i.productId === productId), [items]);

  const clear = useCallback(() => setItems([]), []);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    isInWishlist,
    clear,
    count,
    isOpen,
    openDrawer,
    closeDrawer,
    lastAdded,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
