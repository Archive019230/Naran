"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import BucketList from "@/components/BucketList";
import UploadSection from "@/components/UploadSection";
import FunButtons from "@/components/FunButtons";
import Footer from "@/components/Footer";
import { initialMemories, type Memory } from "@/lib/data";

export default function MemoryBook() {
  const [uploaded, setUploaded] = useState<Memory[]>([]);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <Hero />

      <Gallery memories={[...initialMemories, ...uploaded]} />

      <div className="mx-auto h-px w-24 bg-accent/40" />

      <BucketList />

      <div className="mx-auto h-px w-24 bg-accent/40" />

      <section id="add" className="scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-20">
        <UploadSection onAdd={(m) => setUploaded((prev) => [...prev, m])} />
        <div className="mt-9">
          <FunButtons />
        </div>
      </section>

      <Footer />
    </div>
  );
}
