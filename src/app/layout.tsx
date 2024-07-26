import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { getServerSession } from "next-auth";
import Layout from "@/components/Layout";
import SessionProvider from "@/context/SessionProvider";
import "./globals.css";

const inter = Heebo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel DNC",
  description: "Encontre seu próximo destino",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
