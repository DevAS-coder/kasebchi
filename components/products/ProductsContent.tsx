'use client';

import { Product } from "@/types/product";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProductFilter from "@/components/products/ProductFilter";
import ProductCard from "@/components/shared/ProductCard";
import { Filter, Grid3X3, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

interface ProductsContentProps {
  initialProducts: Product[];
}

export default function ProductsContent({ initialProducts }: ProductsContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<{
    search: string;
    beanTypes: string[];
    origins: string[];
    roastTypes: string[];
  }>({
    search: searchParams.get('search') || "",
    beanTypes: searchParams.getAll('beanType'),
    origins: searchParams.getAll('origin'),
    roastTypes: searchParams.getAll('roastType')
  });
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    filters.beanTypes.forEach(type => params.append('beanType', type));
    filters.origins.forEach(origin => params.append('origin', origin));
    filters.roastTypes.forEach(type => params.append('roastType', type));
    
    router.push(`/products?${params.toString()}`);
  }, [filters, router]);

  // Apply debounced search query to filters
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearchQuery }));
  }, [debouncedSearchQuery]);

  // Filter products when filters change
  useEffect(() => {
    let result = [...initialProducts];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.origins.length > 0) {
      result = result.filter(product => 
        filters.origins.includes(product.origin)
      );
    }
    
    if (filters.roastTypes.length > 0) {
      result = result.filter(product => 
        filters.roastTypes.includes(product.roastLevel)
      );
    }
    
    setFilteredProducts(result);
  }, [filters, initialProducts]);

  const toggleMobileFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  const handleFilterChange = (newFilters: {
    search: string;
    beanTypes: string[];
    origins: string[];
    roastTypes: string[];
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-gray-50 dark:bg-coffee-dark-bg min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-primary dark:text-primary">محصولات</h1>
          
          <div className="flex-1 max-w-md mx-auto md:mx-0">
            <div className="relative">
              <Input
                type="text"
                placeholder="جستجوی محصول..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Search className="h-4 w-4" />
              </span>
            </div>
          </div>
          
          <div className="flex justify-between md:justify-end items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-primary text-white" : "dark:text-gray-300 dark:border-gray-700"}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-primary text-white" : "dark:text-gray-300 dark:border-gray-700"}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="md:hidden flex gap-2 dark:text-gray-300 dark:border-gray-700"
              onClick={toggleMobileFilter}
            >
              <Filter className="h-4 w-4" />
              <span>فیلترها</span>
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filter - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <ProductFilter 
              onFilterChange={handleFilterChange} 
              initialFilters={filters}
            />
          </aside>

          {/* Mobile Filter */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
              <div className="bg-white dark:bg-gray-800 h-full w-4/5 max-w-md overflow-auto animate-slide-in-right">
                <ProductFilter 
                  onFilterChange={handleFilterChange} 
                  isMobile={true}
                  initialFilters={filters}
                  onClose={() => setMobileFilterOpen(false)} 
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">محصولی یافت نشد</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  با معیارهای جستجو و فیلترهای انتخاب شده محصولی یافت نشد. لطفاً معیارهای جستجوی خود را تغییر دهید.
                </p>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 dark:border-gray-600 dark:text-primary dark:hover:bg-gray-700"
                  onClick={() => {
                    setFilters({
                      search: "",
                      beanTypes: [],
                      origins: [],
                      roastTypes: []
                    });
                    setSearchQuery("");
                  }}
                >
                  پاک کردن فیلترها
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 