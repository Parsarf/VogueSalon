"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type BookingPrefill = {
  /** Service id from `services.ts`. */
  serviceId?: string;
  /** Category id, when a category tile is the entry point. */
  categoryId?: string;
  /** Artist slug from `artists.ts`. */
  artistSlug?: string;
};

type BookingState = {
  isOpen: boolean;
  prefill: BookingPrefill;
  open: (prefill?: BookingPrefill) => void;
  close: () => void;
};

const BookingCtx = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});

  const open = useCallback((next: BookingPrefill = {}) => {
    setPrefill(next);
    setIsOpen(true);
    document.documentElement.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.documentElement.style.overflow = "";
  }, []);

  const value = useMemo(() => ({ isOpen, prefill, open, close }), [isOpen, prefill, open, close]);

  return <BookingCtx.Provider value={value}>{children}</BookingCtx.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
