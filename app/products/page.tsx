import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import ProductsContent from "@/components/products/ProductsContent";

export const metadata: Metadata = {
  title: "محصولات | کاسب‌چی",
  description: "مشاهده و خرید انواع قهوه‌های با کیفیت از برندهای معتبر. امکان فیلتر بر اساس نوع دانه، کشور مبدا و درجه رست.",
  openGraph: {
    title: "محصولات | کاسب‌چی",
    description: "مشاهده و خرید انواع قهوه‌های با کیفیت از برندهای معتبر. امکان فیلتر بر اساس نوع دانه، کشور مبدا و درجه رست.",
    type: "website",
  },
};

export const dynamic = 'force-dynamic';

async function getProducts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return <ProductsContent initialProducts={products} />;
}
