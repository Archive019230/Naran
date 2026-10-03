import type { Metadata, Viewport } from "next";
import { Nunito, Fredoka, Caveat } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "📸 Our Story in Photos",
  description: "Even miles apart — our memories stay close 💌",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffafc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fredoka.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" data-mood="0">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
