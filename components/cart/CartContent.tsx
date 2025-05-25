'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Trash2, ShoppingCart, ArrowRight, PlusCircle, MinusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CartContent() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse Persian numbers to English numbers for calculation
  const convertPersianToEnglish = (persianStr: string) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return persianStr
      .split('')
      .map(char => {
        const index = persianDigits.indexOf(char);
        return index !== -1 ? index.toString() : char;
      })
      .join('');
  };
  
  // Calculate total price (removing commas and currency for calculation)
  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      // Extract numbers from price format like "۳۵۰,۰۰۰ تومان"
      const priceText = convertPersianToEnglish(item.price);
      const numericPrice = priceText
        .replace(/[^\d,]/g, '')  // Remove non-digit, non-comma characters
        .replace(/,/g, '');      // Remove commas
      
      const price = parseInt(numericPrice, 10) || 0;
      return total + (price * item.quantity);
    }, 0);
  };
  
  // Format a number to Persian currency format
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('fa-IR')} تومان`;
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast({
        title: "سبد خرید خالی است",
        description: "لطفا ابتدا محصولاتی را به سبد خرید خود اضافه کنید.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "سفارش با موفقیت ثبت شد",
        description: "کارشناسان ما به زودی با شما تماس خواهند گرفت.",
      });
      clearCart();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <ShoppingCart className="h-6 w-6 ml-2 text-primary dark:text-primary" />
          <h1 className="text-2xl font-bold text-primary dark:text-primary">سبد خرید</h1>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <div className="flex justify-center mb-6">
              <ShoppingCart className="h-16 w-16 text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">سبد خرید شما خالی است</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              محصولات مورد نظر خود را به سبد خرید اضافه کنید تا در اینجا نمایش داده شوند.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/products">مشاهده محصولات</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                {/* Cart items */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:mr-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <Link href={`/products/${item.id}`} className="font-semibold text-primary dark:text-primary hover:text-primary/80">
                              {item.name}
                            </Link>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                          <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">{item.price}</p>
                        </div>
                        
                        <div className="mt-4 flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary focus:outline-none"
                          >
                            <MinusCircle className="w-5 h-5" />
                          </button>
                          
                          <span className="mx-2 w-8 text-center text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary focus:outline-none"
                          >
                            <PlusCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4">
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:hover:bg-red-900/20 dark:text-red-400 w-full sm:w-auto"
                    onClick={() => clearCart()}
                  >
                    <Trash2 className="ml-2 w-4 h-4" />
                    حذف همه موارد
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <Link 
                  href="/products" 
                  className="inline-flex items-center text-primary dark:text-primary hover:underline"
                >
                  <ArrowRight className="ml-2 w-4 h-4" />
                  ادامه خرید
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">خلاصه سفارش</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">تعداد اقلام</span>
                    <span className="font-semibold dark:text-white">{cart.totalItems}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">هزینه ارسال</span>
                    <span className="font-semibold dark:text-white">رایگان</span>
                  </div>
                </div>
                
                <Separator className="my-4 dark:bg-gray-700" />
                
                <div className="flex justify-between mb-6">
                  <span className="font-semibold dark:text-white">جمع کل</span>
                  <span className="font-bold text-lg text-primary dark:text-primary">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                  onClick={handleCheckout}
                >
                  {isSubmitting ? 'در حال پردازش...' : 'تکمیل خرید'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 