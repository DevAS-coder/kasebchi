
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartButton = () => {
  const { cart } = useCart();

  return (
    <Link href="/cart">
      <Button variant="ghost" className="relative dark:text-gray-300 dark:hover:text-primary">
        <ShoppingCart className="h-5 w-5" />
        {cart.totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cart.totalItems > 9 ? '9+' : cart.totalItems}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default CartButton;
