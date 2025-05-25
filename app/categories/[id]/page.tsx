'use client';

import { useState } from 'react';
import { CategoryData, SortOption } from '@/types/category';
import { sortProducts } from '@/utils/sorting';
import { ProductCard } from '@/components/products/ProductCard';

async function getCategoryData(id: string): Promise<CategoryData> {
  const res = await fetch(`/api/categories/${id}`);
  if (!res.ok) throw new Error('Failed to fetch category');
  return res.json();
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  
  const categoryData = await getCategoryData(params.id);

  const handleAddToCart = async (productId: string) => {
    try {
      // TODO: Implement cart functionality
      await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const filteredProducts = categoryData.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryData.name}</h1>
        <p className="text-gray-600">{categoryData.description}</p>
      </div>

      {/* Filters and Search */}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts && sortProducts(filteredProducts, sortBy).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {(!filteredProducts || filteredProducts.length === 0) && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found</p>
        </div>
      )}
    </div>
  );
}
