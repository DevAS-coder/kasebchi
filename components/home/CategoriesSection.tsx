
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface CategoryProps {
  title: string;
  image: string;
  slug: string;
}

const categories: CategoryProps[] = [
  {
    title: "قهوه عربیکا",
    image: "img/categories/cat1.jpg",
    slug: "arabic",
  },
  {
    title: "قهوه ترک",
    image: "img/categories/cat2.jpg",
    slug: "turkish",
  },
  {
    title: "اسپرسو",
    image: "img/categories/cat3.jpg",
    slug: "espresso",
  },
  {
    title: "قهوه روبوستا",
    image: "img/categories/cat4.jpg",
    slug: "robusta",
  },
  {
    title: "قهوه ارگانیک",
    image: "img/categories/cat5.jpg",
    slug: "organic",
  },
];

const CategoriesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('categories-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="categories-section" className="py-16 bg-gray-50 dark:bg-coffee-dark-bg">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-12 dark:text-white text-center text-primary transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>دسته‌بندی محصولات</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.slug} 
              to={`/products?category=${category.slug}`}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg group cursor-pointer h-full hover:-translate-y-2">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end transition-all duration-300 group-hover:from-black/90">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg text-white group-hover:text-accent transition-colors">{category.title}</h3>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
