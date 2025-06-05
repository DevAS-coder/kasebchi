import { Coffee, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-coffee-dark to-coffee-dark-bg dark:from-coffee-dark-bg dark:to-[#1a0f0a] border-t border-primary/10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"></div>
      
      <div className="relative pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Coffee className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-white">کاسب‌چی</h3>
              </div>
              <p className="mb-6 text-gray-400">
                پلتفرم اتصال عمده‌فروشان قهوه با کافه‌ها و فروشندگان در ایران
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">دسته‌بندی خدمات</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/categories/coffe-beans" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    دانه قهوه
                  </Link>
                </li>
                <li>
                  <Link href="/categories/equipment" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    تجهیزات صنعتی
                  </Link>
                </li>
                <li>
                  <Link href="/categories/disposable" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    لوازم کافه
                  </Link>
                </li>
                <li>
                  <Link href="/categories/dessert" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    کیک و دسر
                  </Link>
                </li>
                <li>
                  <Link href="/categories/decor" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    طراحی دکور
                  </Link>
                </li>
                <li>
                  <Link href="/categories/menu-designer" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    طراح منو
                  </Link>
                </li>
                <li>
                  <Link href="/categories/cafe-setup" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    راه‌اندازی کافه
                  </Link>
                </li>
                <li>
                  <Link href="/categories/sales-expert" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    کارشناس فروش
                  </Link>
                </li>
                <li>
                  <Link href="/categories/staff" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    منابع انسانی
                  </Link>
                </li>
                <li>
                  <Link href="/categories/support" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    پشتیبانی
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">لینک‌های مفید</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    سوالات متداول
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    شرایط استفاده
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    حریم خصوصی
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                    وبلاگ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">تماس با ما</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">۰۲۱-۱۲۳۴۵۶۷۸</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">info@coffeemarketplace.ir</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 text-center">
            <p className="text-gray-500 text-sm">&copy; ۱۴۰۴ کاسب‌چی. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
