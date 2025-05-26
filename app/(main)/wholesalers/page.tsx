"use client"
import { useWholesalersFilter } from "@/hooks/useWholesalersFilter";
import WholesalersFilter from "@/components/wholesalers/WholesalersFilter";
import MobileFilterDrawer from "@/components/wholesalers/MobileFilterDrawer";
import WholesalersGrid from "@/components/wholesalers/WholesalersGrid";
import { useWholesalers } from "@/hooks/useWholesalers";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Wholesalers = () => {
  const { wholesalers, isLoading, error } = useWholesalers();
  const [isFiltersLoading, setIsFiltersLoading] = useState(true);
  
  const {
    searchTerm,
    setSearchTerm,
    selectedCountries,
    selectedCoffeeTypes,
    mobileFilterOpen,
    countries,
    coffeeTypes,
    toggleCountry,
    toggleCoffeeType,
    clearFilters,
    toggleMobileFilter,
    filteredWholesalers
  } = useWholesalersFilter(wholesalers);

  useEffect(() => {
    if (!isLoading) {
      setIsFiltersLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="bg-gray-50 dark:bg-coffee-dark-bg min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary dark:text-white">عمده‌فروشان</h1>
          
          <MobileFilterDrawer
            isOpen={mobileFilterOpen}
            onClose={toggleMobileFilter}
            countries={countries}
            coffeeTypes={coffeeTypes}
            selectedCountries={selectedCountries}
            selectedCoffeeTypes={selectedCoffeeTypes}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onToggleCountry={toggleCountry}
            onToggleCoffeeType={toggleCoffeeType}
            onClearFilters={clearFilters}
            onToggleFilterDrawer={toggleMobileFilter}
          />
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            {isFiltersLoading ? (
              <div className="space-y-4">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-48" />
              </div>
            ) : (
              <WholesalersFilter
                countries={countries}
                coffeeTypes={coffeeTypes}
                selectedCountries={selectedCountries}
                selectedCoffeeTypes={selectedCoffeeTypes}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onToggleCountry={toggleCountry}
                onToggleCoffeeType={toggleCoffeeType}
                onClearFilters={clearFilters}
              />
            )}
          </aside>

          {/* Wholesalers Grid */}
          <div className="flex-1">
            {error ? (
              <div className="text-center py-8">
                <p className="text-red-500">خطا در بارگذاری اطلاعات: {error}</p>
              </div>
            ) : (
              <WholesalersGrid wholesalers={filteredWholesalers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wholesalers;
