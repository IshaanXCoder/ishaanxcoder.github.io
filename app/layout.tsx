import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ishaan Kesarwani",
  description:
    "Ishaan Kesarwani — Web3, ZK, and systems developer. IIT Roorkee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{if(localStorage.getItem("ishaan-portfolio-theme")==="light")document.documentElement.setAttribute("data-theme","light");}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
