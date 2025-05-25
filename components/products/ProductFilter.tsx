
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Filter, Search, X } from "lucide-react";

interface ProductFilterProps {
  onFilterChange?: (filters: any) => void;
  isMobile?: boolean;
  onClose?: () => void;
  initialFilters?: {
    search: string;
    beanTypes: string[];
    origins: string[];
    roastTypes: string[];
  };
}

const ProductFilter = ({ 
  onFilterChange, 
  isMobile = false, 
  onClose,
  initialFilters
}: ProductFilterProps) => {
  const [filters, setFilters] = useState({
    search: initialFilters?.search || "",
    beanTypes: initialFilters?.beanTypes || [],
    origins: initialFilters?.origins || [],
    roastTypes: initialFilters?.roastTypes || []
  });

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
      return newFilters;
    });
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters(prev => {
      const currentValues = [...prev[category as keyof typeof prev]] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      
      const newFilters = { ...prev, [category]: newValues };
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: "",
      beanTypes: [],
      origins: [],
      roastTypes: []
    };
    setFilters(clearedFilters);
    if (onFilterChange) {
      onFilterChange(clearedFilters);
    }
  };

  return (
    <div className={`bg-white dark:bg-coffee-dark-sidebar ${isMobile ? 'p-4' : 'p-6 rounded-lg shadow-sm border dark:border-gray-700'}`}>
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
            <Filter className="h-5 w-5" />
            فیلترها
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="dark:text-gray-300">
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="جستجوی محصول..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 dark:text-white">نوع دانه</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="bean-arabica"
              checked={(filters.beanTypes as string[]).includes('arabica')}
              onCheckedChange={() => handleCheckboxChange('beanTypes', 'arabica')}
            />
            <Label htmlFor="bean-arabica" className="text-sm dark:text-gray-300">عربیکا</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="bean-robusta"
              checked={(filters.beanTypes as string[]).includes('robusta')}
              onCheckedChange={() => handleCheckboxChange('beanTypes', 'robusta')}
            />
            <Label htmlFor="bean-robusta" className="text-sm dark:text-gray-300">روبوستا</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="bean-blend"
              checked={(filters.beanTypes as string[]).includes('blend')}
              onCheckedChange={() => handleCheckboxChange('beanTypes', 'blend')}
            />
            <Label htmlFor="bean-blend" className="text-sm dark:text-gray-300">ترکیبی</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4 dark:border-gray-700" />

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 dark:text-white">کشور مبدا</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="origin-brazil"
              checked={(filters.origins as string[]).includes('brazil')}
              onCheckedChange={() => handleCheckboxChange('origins', 'brazil')}
            />
            <Label htmlFor="origin-brazil" className="text-sm dark:text-gray-300">برزیل</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="origin-colombia"
              checked={(filters.origins as string[]).includes('colombia')}
              onCheckedChange={() => handleCheckboxChange('origins', 'colombia')}
            />
            <Label htmlFor="origin-colombia" className="text-sm dark:text-gray-300">کلمبیا</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="origin-ethiopia"
              checked={(filters.origins as string[]).includes('ethiopia')}
              onCheckedChange={() => handleCheckboxChange('origins', 'ethiopia')}
            />
            <Label htmlFor="origin-ethiopia" className="text-sm dark:text-gray-300">اتیوپی</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="origin-turkey"
              checked={(filters.origins as string[]).includes('turkey')}
              onCheckedChange={() => handleCheckboxChange('origins', 'turkey')}
            />
            <Label htmlFor="origin-turkey" className="text-sm dark:text-gray-300">ترکیه</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="origin-italy"
              checked={(filters.origins as string[]).includes('italy')}
              onCheckedChange={() => handleCheckboxChange('origins', 'italy')}
            />
            <Label htmlFor="origin-italy" className="text-sm dark:text-gray-300">ایتالیا</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="origin-vietnam"
              checked={(filters.origins as string[]).includes('vietnam')}
              onCheckedChange={() => handleCheckboxChange('origins', 'vietnam')}
            />
            <Label htmlFor="origin-vietnam" className="text-sm dark:text-gray-300">ویتنام</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="origin-iran"
              checked={(filters.origins as string[]).includes('iran')}
              onCheckedChange={() => handleCheckboxChange('origins', 'iran')}
            />
            <Label htmlFor="origin-iran" className="text-sm dark:text-gray-300">ایران</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4 dark:border-gray-700" />

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 dark:text-white">نوع برشته‌کاری</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="roast-light"
              checked={(filters.roastTypes as string[]).includes('light')}
              onCheckedChange={() => handleCheckboxChange('roastTypes', 'light')}
            />
            <Label htmlFor="roast-light" className="text-sm dark:text-gray-300">لایت روست</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="roast-medium"
              checked={(filters.roastTypes as string[]).includes('medium')}
              onCheckedChange={() => handleCheckboxChange('roastTypes', 'medium')}
            />
            <Label htmlFor="roast-medium" className="text-sm dark:text-gray-300">مدیوم روست</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="roast-dark"
              checked={(filters.roastTypes as string[]).includes('dark')}
              onCheckedChange={() => handleCheckboxChange('roastTypes', 'dark')}
            />
            <Label htmlFor="roast-dark" className="text-sm dark:text-gray-300">دارک روست</Label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full dark:border-gray-700 dark:text-gray-300"
          onClick={handleClearFilters}
        >
          پاک کردن فیلترها
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
