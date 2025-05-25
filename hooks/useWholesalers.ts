
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WholesalerType } from '@/types/wholesaler';

export const useWholesalers = (id?: string) => {
  const [wholesalers, setWholesalers] = useState<WholesalerType[]>([]);
  const [wholesaler, setWholesaler] = useState<WholesalerType | null>(null);
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
    const fetchWholesalers = async () => {
      setIsLoading(true);
      try {
        if (id) {
          // Fetch single wholesaler
          const { data, error: fetchError } = await supabase
            .from('wholesalers')
            .select('*')
            .eq('id', id)
            .single();
          
          if (fetchError) {
            setError(fetchError.message);
            console.error('Error fetching wholesaler:', fetchError);
          } else if (data) {
            // Transform image paths
            const processedData = {
              ...data,
              image: data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`,
              logo: data.logo.startsWith('http') ? data.logo : `${baseUrl}${data.logo}`,
            };
            
            setWholesaler(processedData);
            setWholesalers([processedData]);
            setError(null);
          }
        } else {
          // Fetch all wholesalers
          const { data, error: fetchError } = await supabase
            .from('wholesalers')
            .select('*');
          
          if (fetchError) {
            setError(fetchError.message);
            console.error('Error fetching wholesalers:', fetchError);
          } else if (data) {
            // Transform image paths
            const processedData = data.map(w => ({
              ...w,
              image: w.image.startsWith('http') ? w.image : `${baseUrl}${w.image}`,
              logo: w.logo.startsWith('http') ? w.logo : `${baseUrl}${w.logo}`,
            }));
            
            setWholesalers(processedData);
            setError(null);
          }
        }
      } catch (err) {
        setError('Failed to fetch wholesalers');
        console.error('Error fetching wholesalers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWholesalers();
  }, [id, baseUrl]);

  return { wholesalers, wholesaler, isLoading, error };
};

export default useWholesalers;
