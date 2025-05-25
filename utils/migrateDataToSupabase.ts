
import { supabase } from '@/integrations/supabase/client';


export const migrateProductsToSupabase = async () => {
  try {
    // Convert product data to match the Supabase schema
    const formattedProducts = productsData.map(product => {
      let galleryImages = [];
      
      // Create some sample gallery images (using the main image plus variations)
      if (product.image) {
        galleryImages = [product.image, product.image, product.image];
      }
      
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        description: product.description || '',
        beanType: product.category,
        origin: product.specifications?.origin || 'Unknown',
        roastType: product.specifications?.roastLevel || 'Medium',
        gallery_images: galleryImages
      };
    });
    
    // Insert products into Supabase
    const { error } = await supabase
      .from('products')
      .upsert(formattedProducts);
    
    if (error) {
      console.error('Error migrating products:', error);
      return false;
    }
    
    console.log('Products migrated successfully');
    return true;
  } catch (error) {
    console.error('Error migrating products:', error);
    return false;
  }
};

export const migrateWholesalersToSupabase = async () => {
  try {
    // Insert wholesalers into Supabase
    const { error } = await supabase
      .from('wholesalers')
      .upsert(wholesalersData);
    
    if (error) {
      console.error('Error migrating wholesalers:', error);
      return false;
    }
    
    console.log('Wholesalers migrated successfully');
    return true;
  } catch (error) {
    console.error('Error migrating wholesalers:', error);
    return false;
  }
};

export const migrateAllData = async () => {
  const productsSuccess = await migrateProductsToSupabase();
  const wholesalersSuccess = await migrateWholesalersToSupabase();
  
  return productsSuccess && wholesalersSuccess;
};
