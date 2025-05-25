
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ProductCartButtonProps {
  product: {
    id: string;
    name: string;
    price: string;
    category: string;
    image: string;
  };
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

const ProductCartButton = ({ 
  product, 
  size = "default", 
  variant = "default" 
}: ProductCartButtonProps) => {
  const { cart, addToCart } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  
  const isInCart = cart.items.some(item => item.id === product.id);
  
  const handleAddToCart = () => {
    if (isInCart) return;
    
    setIsAdding(true);
    addToCart(product);
    
    toast({
      title: "به سبد خرید اضافه شد",
      description: `${product.name} به سبد خرید شما اضافه شد.`,
      className: "bg-green-500 text-white",
    });
    
    setTimeout(() => setIsAdding(false), 1000);
  };
  
  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      size={size}
      variant={variant}
      className={isInCart ? "bg-green-500 hover:bg-green-600 text-white" : ""}
    >
      {isInCart ? (
        <>
          <Check className="ml-2 h-5 w-5" />
          در سبد خرید
        </>
      ) : (
        <>
          <ShoppingCart className="ml-2 h-5 w-5 text-slate-300" />
          <span className="text-slate-300">افزودن به سبد</span>
        </>
      )}
    </Button>
  );
};

export default ProductCartButton;
