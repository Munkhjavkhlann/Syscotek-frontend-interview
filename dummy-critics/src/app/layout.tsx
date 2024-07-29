"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Navbar } from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const showNavbar =
    pathname === "/" ||
    pathname === "/home" ||
    /^\/content\/[^\/]+$/.test(pathname) ||
    pathname === "/myreview";

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121212] text-[#E0E0E0]`}>
        {showNavbar && <Navbar />}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ position: "relative", width: "100%" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
