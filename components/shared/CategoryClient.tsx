'use client';

import React, { useEffect, useState } from 'react';
import { CategoryData, SortOption } from '@/types/category';
import { sortProducts } from '@/utils/sorting';
import { ProductCard } from '@/components/products/ProductCard';

type Props = {
  id: string;
};

async function getCategoryData(id: string): Promise<CategoryData> {
  const res = await fetch(`/api/categories/${id}`);
  if (!res.ok) throw new Error('Failed to fetch category');
  return res.json();
}

export default function CategoryClient({ id }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryData(id);
        setCategoryData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch category data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async (productId: string) => {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  if (error || !categoryData)
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;

  const filteredProducts = categoryData.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryData.name}</h1>
        <p className="text-gray-600">{categoryData.description}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts && sortProducts(filteredProducts, sortBy).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {(!filteredProducts || filteredProducts.length === 0) && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found</p>
        </div>
      )}
    </div>
  );
}
