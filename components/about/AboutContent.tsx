'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaWarehouse, FaCoffee, FaTruck, FaChartLine, FaShieldAlt } from 'react-icons/fa';

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warmth-50 to-white relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-10"
              style={{
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                border: '2px solid #8B4513',
                left: `${(i * 30) - 20}%`,
                top: `${(i * 20) - 10}%`
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl mx-auto text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-warmth-900 mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            پل ارتباطی صنعت قهوه
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-warmth-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            کاسبچی، اتصال‌دهنده عمده‌فروشان و کافه‌ها برای خدمات یکپارچه و هوشمند
          </motion.p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <motion.section 
        className="py-16 px-4 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-warmth-900 text-center mb-12">خدمات ما</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaHandshake className="w-8 h-8" />,
              title: "ارتباط مستقیم",
              description: "اتصال بی‌واسطه کافه‌ها به عمده‌فروشان معتبر"
            },
            {
              icon: <FaWarehouse className="w-8 h-8" />,
              title: "مدیریت موجودی",
              description: "سیستم هوشمند پیش‌بینی و سفارش‌گذاری"
            },
            {
              icon: <FaTruck className="w-8 h-8" />,
              title: "لجستیک یکپارچه",
              description: "حمل و نقل تخصصی با حفظ کیفیت محصولات"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -10 }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div 
                className="bg-warmth-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-warmth-800"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="font-bold text-xl text-warmth-900 text-center mb-4">{service.title}</h3>
              <p className="text-warmth-700 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Value Proposition */}
      <motion.section 
        className="py-16 px-4 bg-warmth-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-warmth-900">چرا کاسبچی؟</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <FaChartLine className="w-6 h-6" />,
                    text: "بهینه‌سازی هزینه‌های عملیاتی تا ۳۰٪"
                  },
                  {
                    icon: <FaCoffee className="w-6 h-6" />,
                    text: "دسترسی به شبکه گسترده تأمین‌کنندگان معتبر"
                  },
                  {
                    icon: <FaShieldAlt className="w-6 h-6" />,
                    text: "تضمین کیفیت و اصالت محصولات"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 space-x-reverse"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="text-warmth-800">
                      {item.icon}
                    </div>
                    <p className="text-warmth-700">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative h-[400px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-warmth-200 to-warmth-100 rounded-2xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-[url('/img/about/about.jpg')] bg-no-repeat bg-center bg-contain opacity-20"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-warmth-900 mb-8">چشم‌انداز ما</h2>
          <motion.p 
            className="text-xl text-warmth-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ما در تلاشیم تا با ایجاد یک اکوسیستم یکپارچه، صنعت قهوه ایران را متحول کنیم.
            هدف ما تسهیل ارتباط، افزایش کارایی و ارتقای استانداردهای کیفی در زنجیره تأمین قهوه است.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
} 