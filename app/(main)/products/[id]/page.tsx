'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/shared/ProductCard";
import { Info, MapPin, Package, Star } from "lucide-react";
import ProductCartButton from "@/components/shared/ProductCartButton";
import ProductDetailSkeleton from "@/components/products/ProductDetailSkeleton";
import { getProductById, getSimilarProducts } from "@/lib/supabase";
import { Product } from "@/types/product";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const foundProduct = await getProductById(id);
      if (foundProduct) {
        // Set the main image for product card display
        foundProduct.image = foundProduct.images[0];
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        const similar = await getSimilarProducts(foundProduct);
        // Set the main image for each similar product
        const similarWithImages = similar.map(p => ({ ...p, image: p.images[0] }));
        setSimilarProducts(similarWithImages);
      }
      setLoading(false);
    }
    
    loadProduct();
  }, [id]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">محصول مورد نظر یافت نشد</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">متأسفانه محصولی با این شناسه وجود ندارد.</p>
          <Button asChild>
            <Link href="/products">بازگشت به محصولات</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={selectedImage || product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      selectedImage === image ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - تصویر ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews} نظر)
                  </span>
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-4 dark:text-white">{product.name}</h1>
              <div className="text-xl font-semibold text-primary mb-6">{product.price}</div>

              <Separator className="my-6" />

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <ProductCartButton product={product} />
                <Button variant="outline">افزودن به علاقه‌مندی‌ها</Button>
              </div>

              <Separator className="my-6" />

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">مشخصات</TabsTrigger>
                  <TabsTrigger value="origin" className="flex-1">منشأ</TabsTrigger>
                  <TabsTrigger value="wholesaler" className="flex-1">فروشنده</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">فرآوری: {product.processing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">درجه رست: {product.roastLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">ارتفاع: {product.altitude}</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="origin" className="mt-4">
                  <div className="space-y-2">
                    <p className="text-sm">کشور: {product.origin}</p>
                    <p className="text-sm">طعم: {product.flavor}</p>
                    <p className="text-sm">اسیدیته: {product.acidity}</p>
                    <p className="text-sm">بادی: {product.body}</p>
                  </div>
                </TabsContent>
                <TabsContent value="wholesaler" className="mt-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.wholesaler.logo}
                      alt={product.wholesaler.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{product.wholesaler.name}</h3>
                      <p className="text-sm text-gray-500">{product.wholesaler.country}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="p-6 border-t dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">محصولات مشابه</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode="grid" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
