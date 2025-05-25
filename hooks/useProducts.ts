
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  beanType: string;
  origin: string;
  roastType: string;
  gallery_images: string[];
}

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>('/projects/kasebchi/');

  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('app_config')
          .select('value')
          .eq('key', 'base_url')
          .single();
        
        if (error) {
          console.error('Error fetching base URL:', error);
        } else if (data) {
          setBaseUrl(data.value);
        }
      } catch (err) {
        console.error('Error fetching base URL:', err);
      }
    };

    fetchBaseUrl();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let query = supabase.from('products').select('*');
        
        if (category) {
          query = query.eq('category', category);
        }
        
        const { data, error: fetchError } = await query;
        
        if (fetchError) {
          setError(fetchError.message);
          console.error('Error fetching products:', fetchError);
        } else {
          // Transform image paths to include base URL if needed
          const processedData = data.map(product => ({
            ...product,
            image: product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`,
            gallery_images: product.gallery_images?.map((img: string) => 
              img.startsWith('http') ? img : `${baseUrl}${img}`
            ) || []
          }));
          
          setProducts(processedData);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, baseUrl]);

  return { products, isLoading, error };
};

export default useProducts;
