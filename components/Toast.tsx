"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";

type Toast = { id: number; emoji: string; text: string };

const ToastContext = createContext<(emoji: string, text: string) => void>(
  () => {},
);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const push = useCallback((emoji: string, text: string) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev.slice(-2), { id, emoji, text }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[120] flex flex-col items-center gap-3 px-4 sm:bottom-6">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="glass pointer-events-auto flex max-w-[92vw] items-center gap-3 rounded-2xl border border-white/70 px-4 py-3 shadow-lg shadow-black/10 sm:max-w-md sm:px-5"
            >
              <span className="text-xl sm:text-2xl">{t.emoji}</span>
              <p className="text-sm font-bold text-neutral-700 sm:text-base">
                {t.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
