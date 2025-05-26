import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ProductCartButton from "./ProductCartButton";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const { id, name, price, category, image } = product;
  
  if (viewMode === "list") {
    return (
      <Link href={`/products/${id}`} className="block">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col sm:flex-row">
          <div className="sm:w-1/3 aspect-square overflow-hidden relative">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
          <div className="flex flex-col justify-between flex-grow p-4">
            <div>
              <h3 className="font-bold text-lg mb-1 text-primary dark:text-white">{name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{category}</p>
              <p className="font-semibold text-primary dark:text-gray-400 mb-4">
                {price} <span className="text-sm font-normal text-gray-600 dark:text-gray-400">/ کیلوگرم</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                قهوه با کیفیت و عطر فوق‌العاده برای کافه‌ها و فروشندگان عمده
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-accent/20 text-primary dark:bg-accent/10 dark:text-gray-400 text-xs py-1 px-3 rounded-full transition-all duration-300 hover:bg-accent/40">عمده</span>
              <ProductCartButton product={product} size="sm" />
            </div>
          </div>
        </Card>
      </Link>
    );
  }
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <Link href={`/products/${id}`} className="flex-grow">
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-1 text-primary dark:text-white">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{category}</p>
        </CardContent>
      </Link>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
        <p className="font-semibold text-primary dark:text-gray-400">
          {price} <span className="text-sm font-normal text-gray-600 dark:text-gray-400">/ کیلوگرم</span>
        </p>
        <span className="bg-accent/20 text-primary dark:bg-accent/10 dark:text-gray-400 text-xs py-1 px-3 rounded-full transition-all duration-300 hover:bg-accent/40">عمده</span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
