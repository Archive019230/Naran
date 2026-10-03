"use client";

import { useCallback, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { bucketItems } from "@/lib/data";

const STORAGE_KEY = "naran-bucket-list";
const EMPTY: Record<string, boolean> = {};

let cache: Record<string, boolean> | null = null;
const listeners = new Set<() => void>();

function load(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = () => {
    cache = null;
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  if (cache === null) cache = load();
  return cache;
}

function getServerSnapshot() {
  return EMPTY;
}

function save(next: Record<string, boolean>) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode */
  }
  emit();
}

export default function BucketList() {
  const done = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const current = getSnapshot();
    save({ ...current, [id]: !current[id] });
  }, []);

  const completed = bucketItems.filter((item) => done[item.id]).length;

  return (
    <section
      id="next-time"
      className="relative scroll-mt-24 overflow-hidden px-4 py-14 sm:px-6 sm:py-20"
    >
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute top-10 -left-24 h-56 w-56 rounded-full bg-blob-2 opacity-60 blur-3xl sm:h-72 sm:w-72"
        style={{ animationDelay: "-4s" }}
      />
      <div className="relative mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl font-semibold text-ink-strong sm:text-4xl">
          🕊️ Next Time We Meet...
        </h2>
        <p className="font-hand mt-1 text-xl text-ink-muted sm:text-2xl">
          tick them off together, one by one
        </p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-extrabold tracking-wide text-ink-muted uppercase">
            <span>progress</span>
            <span>
              {completed}/{bucketItems.length}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface/80 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{
                width: `${(completed / bucketItems.length) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
            />
          </div>
        </div>

        <ul className="mt-6 space-y-3 text-left">
          {bucketItems.map((item, i) => {
            const isDone = !!done[item.id];
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-pressed={isDone}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:px-5 ${
                    isDone
                      ? "border-accent/40 bg-accent-soft"
                      : "border-line bg-surface/80"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 text-xs font-black transition-all ${
                      isDone
                        ? "border-accent bg-accent text-surface"
                        : "border-line bg-surface text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span
                    className={`text-base font-bold transition-all sm:text-lg ${
                      isDone
                        ? "text-ink-muted line-through"
                        : "text-ink-strong"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
