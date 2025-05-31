"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section 
      className="hero-section relative min-h-[90vh] flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/img/home/heroSection.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 justify-center flex flex-col items-center">
        <motion.img 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="./img/logo/logo.webp"
          width={230}
          height={230}
          alt="Logo"
          className="-mt-20 mb-10 drop-shadow-2xl"
          loading="eager"
        />
        
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight"
        >
          هر چیزی که کافه‌‌ها نیاز دارن رو{" "}
          <span className="text-accent">اینجا پیدا کن</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 text-gray-100/90"
        >
          از میان ده‌ها عمده‌فروش معتبر انتخاب کن و با خیال راحت سفارش بده.
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-primary font-bold px-12 py-6 rounded-full transform transition-all duration-300 hover:scale-105 text-lg"
          >
            <Link href="/products">شروع خرید</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white rounded-full px-12 py-6 transform transition-all duration-300 hover:scale-105 text-lg backdrop-blur-sm"
          >
            <Link href="/wholesalers">مشاهده عمده‌فروشان</Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
