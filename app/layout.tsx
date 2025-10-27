// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AdminProvider } from "@/app/contexts/AdminContext"; // Import AdminProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DealHub - Best Coupons & Deals",
  description: "Find the best coupons, deals, and discounts from top stores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}