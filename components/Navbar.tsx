"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "#album", label: "Album" },
  { href: "#next-time", label: "Next Time We Meet" },
  { href: "#add", label: "Add memory" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass sticky top-0 z-50 border-b border-line/70"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-display text-lg font-semibold text-ink-strong transition-transform hover:scale-105 sm:text-xl"
        >
          📸 Naran
        </a>

        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-ink-muted transition-colors hover:bg-accent-soft hover:text-ink-strong"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-line bg-surface text-lg text-ink-strong shadow-sm transition-transform hover:scale-105 sm:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line/70 px-4 pb-3 sm:hidden"
          >
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-xl bg-surface/60 px-4 py-3 text-sm font-bold text-ink transition-colors hover:bg-accent-soft hover:text-ink-strong"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
