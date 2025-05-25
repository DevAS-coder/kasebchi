
import { Coffee, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auhref px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6" />
              <h3 className="text-xl font-bold">کاسب‌چی</h3>
            </div>
            <p className="mb-6 text-gray-300">
              پلتفرم اتصال عمده‌فروشان قهوه با کافه‌ها و فروشندگان در ایران
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">دسته‌بندی خدمات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/coffe-beans" className="text-gray-300 hover:text-accent transition-colors">
                  دانه قهوه
                </Link>
              </li>
              <li>
                <Link href="/categories/equipment" className="text-gray-300 hover:text-accent transition-colors">
                  تجهیزات صنعتی
                </Link>
              </li>
              <li>
                <Link href="/categories/disposable" className="text-gray-300 hover:text-accent transition-colors">
                  لوازم کافه
                </Link>
              </li>
              <li>
                <Link href="/categories/dessert" className="text-gray-300 hover:text-accent transition-colors">
                  کیک و دسر
                </Link>
              </li>
              <li>
                <Link href="/categories/decor" className="text-gray-300 hover:text-accent transition-colors">
                  طراحی دکور
                </Link>
              </li>
              <li>
                <Link href="/categories/menu-designer" className="text-gray-300 hover:text-accent transition-colors">
                  طراح منو
                </Link>
              </li>
              <li>
                <Link href="/categories/coffe-beans" className="text-gray-300 hover:text-accent transition-colors">
                  راه‌اندازی کافه
                </Link>
              </li>
              <li>
                <Link href="/categories/sales-expert" className="text-gray-300 hover:text-accent transition-colors">
                  کارشناس فروش
                </Link>
              </li>
              <li>
                <Link href="/categories/staff" className="text-gray-300 hover:text-accent transition-colors">
                  منابع انسانی
                </Link>
              </li>
              <li>
                <Link href="/categories/support" className="text-gray-300 hover:text-accent transition-colors">
                  پشتیبانی
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">لینک‌های مفید</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-accent transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-accent transition-colors">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-accent transition-colors">
                  شرایط استفاده
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-accent transition-colors">
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-accent transition-colors">
                  وبلاگ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span className="text-gray-300">تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-gray-300">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-gray-300">info@coffeemarketplace.ir</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-300 text-sm">
          <p>&copy; ۱۴۰۴ کاسب‌چی. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
