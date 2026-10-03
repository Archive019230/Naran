"use client";

import { motion } from "motion/react";
import { useToast } from "@/components/Toast";
import { compliments, funnyReplies, moods } from "@/lib/data";

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

function applyMood(index: number) {
  const m = moods[index];
  const root = document.body;
  root.style.setProperty("--mood-bg", m.bg);
  root.style.setProperty("--mood-blob-1", m.blob1);
  root.style.setProperty("--mood-blob-2", m.blob2);
  root.style.setProperty("--mood-accent", m.accent);
  root.style.setProperty("--mood-accent-soft", m.accentSoft);
  root.dataset.mood = String(index);
}

export default function FunButtons() {
  const toast = useToast();

  const cycleMood = () => {
    const next = (Number(document.body.dataset.mood || 0) + 1) % moods.length;
    applyMood(next);
    toast("🎨", `Mood switched to ${moods[next].name} ${moods[next].bg === "#fffafc" ? "🌸" : "✨"}`);
  };

  const buttons = [
    {
      label: "😭 Press if you miss us",
      onClick: () => toast("😭", pick(funnyReplies)),
      className: "bg-[#ffd9f9] hover:bg-[#ffe9fd]",
    },
    {
      label: "💖 Need motivation?",
      onClick: () => toast("💖", pick(compliments)),
      className: "bg-[#d9f0ff] hover:bg-[#eaf7ff]",
    },
    {
      label: "🎨 Change the mood",
      onClick: cycleMood,
      className: "bg-[#e2ffd9] hover:bg-[#f0ffe9]",
    },
  ];

  return (
    <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap sm:gap-4">
      {buttons.map((b, i) => (
        <motion.button
          key={b.label}
          type="button"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={b.onClick}
          className={`w-full cursor-pointer rounded-2xl px-5 py-3.5 text-sm font-extrabold text-neutral-700 shadow-lg shadow-black/10 transition-colors sm:w-auto sm:text-base ${b.className}`}
        >
          {b.label}
        </motion.button>
      ))}
    </div>
  );
}
