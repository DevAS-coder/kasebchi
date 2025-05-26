"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

interface WholesalersFilterProps {
  countries: string[];
  coffeeTypes: string[];
  selectedCountries: string[];
  selectedCoffeeTypes: string[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onToggleCountry: (country: string) => void;
  onToggleCoffeeType: (type: string) => void;
  onClearFilters: () => void;
}

const WholesalersFilter = ({
  countries,
  coffeeTypes,
  selectedCountries,
  selectedCoffeeTypes,
  searchTerm,
  onSearchChange,
  onToggleCountry,
  onToggleCoffeeType,
  onClearFilters
}: WholesalersFilterProps) => {
  return (
    <div className="bg-white dark:bg-coffee-dark-sidebar rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <Input
            placeholder="جستجوی عمده‌فروش..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 dark:text-gray-200">کشور</h3>
        <div className="flex flex-wrap gap-2">
          {countries.map(country => (
            <Badge
              key={country}
              variant={selectedCountries.includes(country) ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCountries.includes(country) 
                  ? 'bg-primary hover:bg-primary/90 text-white' 
                  : 'hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              onClick={() => onToggleCountry(country)}
            >
              {country}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-4 dark:bg-gray-700" />

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 dark:text-gray-200">نوع قهوه</h3>
        <div className="flex flex-wrap gap-2">
          {coffeeTypes.map(type => (
            <Badge
              key={type}
              variant={selectedCoffeeTypes.includes(type) ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCoffeeTypes.includes(type) 
                  ? 'bg-primary hover:bg-primary/90 text-white' 
                  : 'hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              onClick={() => onToggleCoffeeType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={onClearFilters}
        >
          پاک کردن فیلترها
        </Button>
      </div>
    </div>
  );
};

export default WholesalersFilter;
