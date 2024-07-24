import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const inter = Heebo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel DNC",
  description: "Encontre seu próximo destino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
