"use client";

import { Coffee, Award, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const IntroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('intro-section');
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
    <section 
      id="intro-section" 
      className="relative py-24 bg-gradient-to-b from-white to-coffee-light dark:from-coffee-dark-bg dark:to-coffee-dark-accent border-b-2 border-primary overflow-hidden"
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a87d56' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-6 text-primary dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            معرفی پلتفرم کاسب‌چی
          </h2>
          <p className="dark:text-white/90 text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            کاسبچی، اولین پلتفرم تخصصی ارتباط بین عمده‌فروشان و خریداران قهوه
             در ایران است که با هدف ایجاد شفافیت، سهولت و اطمینان در معاملات قهوه راه‌اندازی شده است.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Coffee className="h-7 w-7" />,
              title: "کیفیت تضمین شده",
              description: "تمامی محصولات ارائه شده در پلتفرم دارای استانداردهای کیفی بالا و تاییدیه‌های معتبر هستند.",
              delay: "100"
            },
            {
              icon: <Award className="h-7 w-7" />,
              title: "ارتباط مستقیم",
              description: "امکان ارتباط مستقیم با عمده‌فروشان و تولیدکنندگان برای دریافت بهترین قیمت و شرایط.",
              delay: "200"
            },
            {
              icon: <TrendingUp className="h-7 w-7" />,
              title: "تنوع خدمات",
              description: "دسترسی به طیف وسیعی از خدمات مورد نیاز صنعت قهوه.",
              delay: "300"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`group bg-white/50 dark:bg-coffee-dark-accent/50 backdrop-blur-sm rounded-xl p-8 text-center transition-all duration-700 shadow-lg hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } hover:-translate-y-3`}
              style={{ transitionDelay: `${item.delay}ms` }}
            >
              <div className="bg-gradient-to-br from-primary to-primary/80 inline-flex p-4 rounded-xl text-white mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold dark:hover:text-white mb-4 text-primary dark:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
