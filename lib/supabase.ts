import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types/product';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProductById(id: string): Promise<Product | null> {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return product;
}

export async function getSimilarProducts(currentProduct: Product): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .or(`category.eq.${currentProduct.category},origin.eq.${currentProduct.origin}`)
    .neq('id', currentProduct.id)
    .limit(3);

  if (error) {
    console.error('Error fetching similar products:', error);
    return [];
  }

  return products;
} 