"use client";

import { motion } from "motion/react";
import { useToast } from "@/components/Toast";
import { compliments, funnyReplies } from "@/lib/data";
import { applyMood, currentMoodIndex } from "@/lib/theme";

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function FunButtons() {
  const toast = useToast();

  const cycleMood = () => {
    const mood = applyMood(currentMoodIndex() + 1);
    toast(mood.emoji, `Theme switched to ${mood.name} ${mood.emoji}`);
  };

  const buttons = [
    {
      label: "😭 Press if you miss us",
      onClick: () => toast("😭", pick(funnyReplies)),
      className: "bg-accent-soft text-ink-strong",
    },
    {
      label: "💖 Need motivation?",
      onClick: () => toast("💖", pick(compliments)),
      className: "bg-blob-2/70 text-ink-strong",
    },
    {
      label: "🎨 Change the mood",
      onClick: cycleMood,
      className: "bg-blob-1/70 text-ink-strong",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap sm:gap-4">
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
          className={`w-full cursor-pointer rounded-2xl px-5 py-3.5 text-sm font-extrabold shadow-lg shadow-black/10 transition-colors sm:w-auto sm:text-base ${b.className}`}
        >
          {b.label}
        </motion.button>
      ))}
    </div>
  );
}
