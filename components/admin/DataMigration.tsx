
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { migrateAllData, migrateProductsToSupabase, migrateWholesalersToSupabase } from '@/utils/migrateDataToSupabase';
import { toast } from '@/components/ui/use-toast';

interface DataMigrationProps {
  onClose?: () => void;
}

const DataMigration = ({ onClose }: DataMigrationProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMigrateProducts = async () => {
    setIsLoading(true);
    try {
      const success = await migrateProductsToSupabase();
      if (success) {
        toast({
          title: "موفقیت",
          description: "محصولات با موفقیت به دیتابیس منتقل شدند",
          variant: "default",
        });
      } else {
        toast({
          title: "خطا",
          description: "مشکلی در انتقال محصولات به دیتابیس رخ داد",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast({
        title: "خطا",
        description: "مشکلی در انتقال محصولات به دیتابیس رخ داد",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMigrateWholesalers = async () => {
    setIsLoading(true);
    try {
      const success = await migrateWholesalersToSupabase();
      if (success) {
        toast({
          title: "موفقیت",
          description: "عمده‌فروشان با موفقیت به دیتابیس منتقل شدند",
          variant: "default",
        });
      } else {
        toast({
          title: "خطا",
          description: "مشکلی در انتقال عمده‌فروشان به دیتابیس رخ داد",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast({
        title: "خطا",
        description: "مشکلی در انتقال عمده‌فروشان به دیتابیس رخ داد",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMigrateAll = async () => {
    setIsLoading(true);
    try {
      const success = await migrateAllData();
      if (success) {
        toast({
          title: "موفقیت",
          description: "تمام داده‌ها با موفقیت به دیتابیس منتقل شدند",
          variant: "default",
        });
      } else {
        toast({
          title: "خطا",
          description: "مشکلی در انتقال داده‌ها به دیتابیس رخ داد",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast({
        title: "خطا",
        description: "مشکلی در انتقال داده‌ها به دیتابیس رخ داد",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">انتقال داده‌ها به سوپابیس</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        با استفاده از دکمه‌های زیر می‌توانید داده‌های موجود در فایل‌های محلی را به دیتابیس سوپابیس منتقل کنید.
      </p>
      
      <div className="space-y-4">
        <Button 
          onClick={handleMigrateProducts} 
          disabled={isLoading}
          className="w-full"
        >
          انتقال محصولات
        </Button>
        
        <Button 
          onClick={handleMigrateWholesalers} 
          disabled={isLoading}
          className="w-full"
        >
          انتقال عمده‌فروشان
        </Button>
        
        <Button 
          onClick={handleMigrateAll} 
          disabled={isLoading}
          className="w-full bg-primary"
        >
          انتقال تمام داده‌ها
        </Button>
        
        {onClose && (
          <Button 
            onClick={onClose} 
            variant="outline"
            className="w-full"
          >
            بستن
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataMigration;
