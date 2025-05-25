
import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { WholesalerType } from '@/types/wholesaler';

export const useWholesalersFilter = (wholesalersData: WholesalerType[] = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCoffeeTypes, setSelectedCoffeeTypes] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Extract unique countries from data
  const countries = useMemo(() => {
    return Array.from(new Set(wholesalersData.map(w => w.country))).sort();
  }, [wholesalersData]);

  // Extract unique coffee types from data
  const coffeeTypes = useMemo(() => {
    const allTypes = wholesalersData.flatMap(w => w.coffeeTypes);
    return Array.from(new Set(allTypes)).sort();
  }, [wholesalersData]);

  // Filter wholesalers based on search term and selected filters
  const filteredWholesalers = useMemo(() => {
    return wholesalersData.filter(wholesaler => {
      // Filter by search term
      const matchesSearch = 
        debouncedSearchTerm === '' ||
        wholesaler.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        wholesaler.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        wholesaler.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      // Filter by country
      const matchesCountry = 
        selectedCountries.length === 0 ||
        selectedCountries.includes(wholesaler.country);
      
      // Filter by coffee types
      const matchesCoffeeType = 
        selectedCoffeeTypes.length === 0 ||
        wholesaler.coffeeTypes.some(type => selectedCoffeeTypes.includes(type));
      
      return matchesSearch && matchesCountry && matchesCoffeeType;
    });
  }, [wholesalersData, debouncedSearchTerm, selectedCountries, selectedCoffeeTypes]);

  // Toggle country filter
  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  // Toggle coffee type filter
  const toggleCoffeeType = (type: string) => {
    setSelectedCoffeeTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountries([]);
    setSelectedCoffeeTypes([]);
  };

  // Toggle mobile filter drawer
  const toggleMobileFilter = () => {
    setMobileFilterOpen(prev => !prev);
  };

  return {
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
  };
};
