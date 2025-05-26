import { Metadata } from "next";
import CartContent from "@/components/cart/CartContent";

export const metadata: Metadata = {
  title: "سبد خرید | کاسب‌چی",
  description: "مشاهده و مدیریت سبد خرید شما در کاسب‌چی. امکان تغییر تعداد، حذف محصولات و تکمیل خرید.",
  openGraph: {
    title: "سبد خرید | کاسب‌چی",
    description: "مشاهده و مدیریت سبد خرید شما در کاسب‌چی. امکان تغییر تعداد، حذف محصولات و تکمیل خرید.",
    type: "website",
  },
};

export const dynamic = 'force-dynamic';

export default function CartPage() {
  return <CartContent />;
}
