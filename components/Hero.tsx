"use client";

import { motion } from "motion/react";

const floatingEmojis = [
  { char: "💌", className: "top-[18%] left-[4%] text-2xl sm:text-4xl", delay: 0 },
  { char: "📸", className: "top-[30%] right-[5%] text-2xl sm:text-4xl", delay: 0.6 },
  { char: "💫", className: "bottom-[24%] left-[8%] text-xl sm:text-3xl", delay: 1.2 },
  { char: "🕊️", className: "bottom-[18%] right-[8%] text-xl sm:text-3xl", delay: 1.8 },
];

export default function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28"
    >
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-blob-1 opacity-70 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-16 -right-24 h-64 w-64 rounded-full bg-blob-2 opacity-70 blur-3xl sm:h-96 sm:w-96"
        style={{ animationDelay: "-8s" }}
      />

      {floatingEmojis.map((e) => (
        <span
          key={e.char}
          aria-hidden
          className={`animate-floaty pointer-events-none absolute select-none ${e.className}`}
          style={{ animationDelay: `${e.delay}s` }}
        >
          {e.char}
        </span>
      ))}

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-xs font-extrabold tracking-widest text-ink-muted uppercase backdrop-blur sm:text-sm"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          best friends · forever
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl leading-[1.1] font-semibold text-ink-strong sm:text-6xl md:text-7xl"
        >
          📸 Our Story <span className="text-shimmer">in Photos</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-hand mt-4 text-2xl text-ink-muted sm:text-3xl"
        >
          Even miles apart — our memories stay close 💌
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4"
        >
          {[
            { value: "3+", label: "memories" },
            { value: "∞", label: "laughs" },
            { value: "2", label: "countries" },
          ].map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl border border-line px-4 py-2 shadow-sm sm:px-6 sm:py-3"
            >
              <p className="font-display text-xl font-semibold text-accent sm:text-2xl">
                {s.value}
              </p>
              <p className="text-[11px] font-bold tracking-wide text-ink-muted uppercase sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
