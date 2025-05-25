'use client';

import { Mail, MapPin, Phone, Loader2, MessageCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ContactContent() {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [formState, setFormState] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Reset form
    setFormState({
      fullname: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-coffee-dark-bg dark:to-coffee-dark-bg/95 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-primary dark:text-white mb-6 relative inline-block"
            >
              تماس با ما
              <div className="absolute bottom--5 left-0 w-full h-1 bg-primary/20 dark:bg-[#ffffff] rounded-full"></div>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              سوالی دارید؟ نظری یا پیشنهادی دارید؟ از طریق راه‌های ارتباطی زیر با ما در تماس باشید.
              کارشناسان ما آماده پاسخگویی به شما هستند.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-primary dark:text-white">اطلاعات تماس</h2>
              
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 bg-white dark:bg-coffee-dark-sidebar p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-primary dark:bg-primary/80 text-white p-4 rounded-xl">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">آدرس</h3>
                    <p className="text-gray-600 dark:text-gray-400">تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
                    <p className="text-gray-600 dark:text-gray-400">کد پستی: ۱۴۳۴۵۶۷۸۹۰</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 bg-white dark:bg-coffee-dark-sidebar p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-primary dark:bg-primary/80 text-white p-4 rounded-xl">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">تلفن</h3>
                    <p className="text-gray-600 dark:text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</p>
                    <p className="text-gray-600 dark:text-gray-400">۰۲۱-۹۸۷۶۵۴۳۲</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 bg-white dark:bg-coffee-dark-sidebar p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-primary dark:bg-primary/80 text-white p-4 rounded-xl">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">ایمیل</h3>
                    <p className="text-gray-600 dark:text-gray-400">info@coffeemarketplace.ir</p>
                    <p className="text-gray-600 dark:text-gray-400">support@coffeemarketplace.ir</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 bg-white dark:bg-coffee-dark-sidebar p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-[#6f4e37] dark:bg-[#6f4e37cc]/80 text-white p-4 rounded-xl">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">تلگرام</h3>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center">
                      <span className="font-mono">@CoffeeMarketplace</span>
                      <Button 
                        variant="link" 
                        className="text-[#6f4e37] dark:text-[#6f4e37] p-0 h-auto text-sm mr-2 hover:no-underline"
                        onClick={() => window.open('https://t.me/CoffeeMarketplace', '_blank')}
                      >
                        (مشاهده پروفایل)
                      </Button>
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 bg-white dark:bg-coffee-dark-sidebar p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-[#6f4e37] dark:bg-[#6f4e37cc]/80 text-white p-4 rounded-xl">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">واتس‌اپ</h3>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center">
                      <span className="font-mono">+98 912 345 6789</span>
                      <Button 
                        variant="link" 
                        className="text-[#6f4e37] dark:text-[#6f4e37cc] p-0 h-auto text-sm mr-2 hover:no-underline"
                        onClick={() => window.open('https://wa.me/989123456789', '_blank')}
                      >
                        (شروع گفتگو)
                      </Button>
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 bg-white dark:bg-coffee-dark-sidebar p-6 rounded-xl shadow-sm"
              >
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-4">ساعات کاری</h3>
                <table className="w-full text-gray-600 dark:text-gray-400">
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-3">شنبه تا چهارشنبه</td>
                      <td className="text-left py-3">۹ صبح - ۵ بعدازظهر</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-3">پنج‌شنبه</td>
                      <td className="text-left py-3">۹ صبح - ۱ بعدازظهر</td>
                    </tr>
                    <tr>
                      <td className="py-3">جمعه</td>
                      <td className="text-left py-3">تعطیل</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-coffee-dark-sidebar p-8 rounded-xl shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-8 text-primary dark:text-white">فرم تماس</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    value={formState.fullname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary/80 focus:border-transparent dark:bg-coffee-dark-bg dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary/80 focus:border-transparent dark:bg-coffee-dark-bg dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary/80 focus:border-transparent dark:bg-coffee-dark-bg dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    موضوع
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary/80 focus:border-transparent dark:bg-coffee-dark-bg dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    پیام
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary/80 focus:border-transparent dark:bg-coffee-dark-bg dark:text-white"
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      در حال ارسال...
                    </>
                  ) : (
                    'ارسال پیام'
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 