"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Memory } from "@/lib/data";

const tilts = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-1"];

export default function Gallery({ memories }: { memories: Memory[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) => {
      setActive((i) =>
        i === null ? i : (i + dir + memories.length) % memories.length,
      );
    },
    [memories.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active === null ? null : memories[active];

  return (
    <section id="album" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 text-center sm:mb-12">
          <h2 className="font-display text-3xl font-semibold text-neutral-800 sm:text-4xl">
            🖼️ The Album
          </h2>
          <p className="font-hand mt-1 text-xl text-neutral-500 sm:text-2xl">
            tap a photo to remember the whole story
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3">
          {memories.map((m, i) => (
            <motion.button
              key={m.id}
              type="button"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setActive(i)}
              aria-label={`Open ${m.title}`}
              className={`group relative mx-auto w-full max-w-sm cursor-pointer rounded-2xl bg-white p-3 pb-4 shadow-xl shadow-black/10 transition-transform duration-300 sm:max-w-none ${
                tilts[i % tilts.length]
              } hover:rotate-0 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none`}
            >
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 rounded-sm bg-accent-soft/80 shadow-sm"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/45 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <p className="font-hand text-center text-xl leading-tight text-white drop-shadow sm:text-2xl">
                    {m.note}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2 px-1">
                <p className="truncate text-sm font-extrabold text-neutral-700 sm:text-base">
                  {m.title}
                </p>
                <p className="font-hand shrink-0 text-lg text-accent">
                  {m.date}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="glass absolute -top-3 right-0 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-lg font-bold text-neutral-600 shadow-md transition hover:scale-110 sm:-top-12 sm:right-0"
              >
                ✕
              </button>

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-900 sm:aspect-[4/3]">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 92vw, 720px"
                  className="object-contain"
                />
              </div>

              <div className="glass mt-3 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-600 shadow transition hover:scale-110 hover:text-accent"
                >
                  ‹
                </button>
                <div className="min-w-0 text-center">
                  <p className="truncate font-display text-base font-semibold text-neutral-800 sm:text-lg">
                    {current.title}
                  </p>
                  <p className="font-hand text-lg leading-tight text-neutral-500 sm:text-xl">
                    {current.note} · {current.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-600 shadow transition hover:scale-110 hover:text-accent"
                >
                  ›
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
