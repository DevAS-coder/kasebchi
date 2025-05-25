"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import WholesalerCard from "../shared/WholesalerCard";
import WholesalerCardSkeleton from "../shared/WholesalerCardSkeleton";
import { useWholesalers } from "@/hooks/useWholesalers";
import { WholesalerType } from "@/types/wholesaler";

const WholesalersSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { wholesalers, isLoading } = useWholesalers();
  const [featuredWholesalers, setFeaturedWholesalers] = useState<WholesalerType[]>([]);

  useEffect(() => {
    if (!isLoading && wholesalers.length > 0) {
      // Get featured wholesalers (first 7)
      setFeaturedWholesalers(wholesalers.slice(0, 7));
    }
  }, [isLoading, wholesalers]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth"
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-coffee-dark-bg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary dark:text-white">عمده‌فروشان منتخب</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-primary text-primary dark:border-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-gray-800 transition-transform active:scale-95"
              onClick={scrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-primary text-primary dark:border-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-gray-800 transition-transform active:scale-95"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {isLoading ? (
            // Display skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="min-w-[280px] max-w-[280px]">
                <WholesalerCardSkeleton />
              </div>
            ))
          ) : (
            // Display actual wholesalers once loaded
            featuredWholesalers.map((wholesaler) => (
              <div key={wholesaler.id} className="min-w-[280px] max-w-[280px]">
                <WholesalerCard {...wholesaler} />
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-8">
          <Button 
            asChild
            variant="outline"
            className="border-primary text-primary dark:border-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-gray-800 transition-transform hover:-translate-y-1 active:translate-y-0"
          >
            <Link href="/wholesalers">مشاهده تمام عمده‌فروشان</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WholesalersSection;
