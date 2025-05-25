
import WholesalerCard from "@/components/shared/WholesalerCard";
import { WholesalerType } from "@/types/wholesaler";

interface WholesalersGridProps {
  wholesalers: WholesalerType[];
}

const WholesalersGrid = ({ wholesalers }: WholesalersGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wholesalers.map((wholesaler) => (
        <WholesalerCard key={wholesaler.id} {...wholesaler} />
      ))}

      {wholesalers.length === 0 && (
        <div className="col-span-full py-16 text-center">
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">نتیجه‌ای یافت نشد</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">لطفا معیارهای جستجو یا فیلترها را تغییر دهید.</p>
        </div>
      )}
    </div>
  );
};

export default WholesalersGrid;
