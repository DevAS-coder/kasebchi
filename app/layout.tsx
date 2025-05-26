import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UsersProvider } from "@/contexts/UserContext";
import { WholeSalerProvider } from "@/contexts/WholeSalerInfo";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "کاسب‌چی",
  description: "پلتفرم خرید و فروش خدمات کافه و کافه‌ها",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider>
          <UsersProvider>
            <WholeSalerProvider>
              <CartProvider>
              <Toaster />
              <Sonner/>
                {children}
              </CartProvider>
            </WholeSalerProvider>
          </UsersProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
