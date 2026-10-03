"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useToast } from "@/components/Toast";
import type { Memory } from "@/lib/data";

export default function UploadSection({
  onAdd,
}: {
  onAdd: (memory: Memory) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const toast = useToast();

  const handleFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("⚠️", "That file isn’t an image — send a photo 📸");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result;
      if (typeof src !== "string") return;
      onAdd({
        id: `upload-${Date.now()}`,
        src,
        alt: "New memory",
        title: "Poland Memory 📍",
        date: new Date().toLocaleDateString("en-CA"),
        note: "New chapter begins 🇵🇱✨",
        tilt: "rotate-1",
      });
      toast("🎉", "Added to the album! (this session only)");
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold text-neutral-800 sm:text-4xl">
          From The Best Friends of You, With Love
        </h2>
        <p className="font-hand mt-1 text-xl text-neutral-500 sm:text-2xl">
          add your new adventures below 💌
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-7 rounded-3xl border-2 border-dashed border-accent/40 bg-white/70 p-6 shadow-lg shadow-black/5 backdrop-blur sm:p-9"
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl px-4 py-8 transition-all duration-300 sm:py-10 ${
              dragging
                ? "scale-[1.02] bg-accent-soft"
                : "hover:bg-accent-soft/60"
            }`}
          >
            <motion.span
              animate={dragging ? { y: -6, scale: 1.1 } : { y: 0, scale: 1 }}
              className="text-4xl sm:text-5xl"
            >
              📷
            </motion.span>
            <p className="font-display text-base font-semibold text-neutral-700 sm:text-lg">
              Drop a photo here or tap to browse
            </p>
            <p className="text-xs font-bold tracking-wide text-neutral-400 uppercase sm:text-sm">
              jpg · png · heic
            </p>
          </div>

          <input
            ref={inputRef}
            id="photoUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />

          <p className="mt-5 text-sm leading-relaxed text-neutral-500">
            This button doesn’t save permanently — for keeps, send it on
            Messenger <br className="hidden sm:block" />
            <span className="font-hand text-lg text-accent">
              2024–2028 · GPA 4.0 🎓
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
