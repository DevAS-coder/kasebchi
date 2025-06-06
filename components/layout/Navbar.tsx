"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import { Menu, X, Search, ChevronDown } from "lucide-react";

const navigation = [
  { name: "خانه", href: "/" },
  {
    name: "خدمات",
    href: "/categories",
    subCategories: [
      { name: "دانه قهوه", href: "/categories/coffee-beans" },
      { name: "تجهیزات صنعتی", href: "/categories/equipment" },
      { name: "لوازم کافه", href: "/categories/disposable" },
      { name: "کیک و دسر", href: "/categories/dessert" },
      { name: "طراحی دکور", href: "/categories/decor" },
      { name: "طراح منو", href: "/categories/menu-designer" },
      { name: "راه‌اندازی کافه", href: "/categories/cafe-setup" },
      { name: "کارشناس فروش", href: "/categories/sales-expert" },
      { name: "منابع انسانی", href: "/categories/staff" },
      { name: "پشتیبانی", href: "/categories/support" },
    ]
  },
  { name: "درباره ما", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-sm dark:bg-coffee-dark-bg/95 ${
        scrolled ? "shadow-md dark:shadow-black/20" : ""
      }`}
    >
      <nav className="md:container mx-auto" aria-label="Top">
        {/* Header Row 1 */}
        <div className="w-full py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          {/* Right side group (in RTL) */}
          <div className="flex items-center">
            {/* Mobile hamburger menu */}
            <div className="md:hidden mr-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6 dark:text-white" />
                )}
              </Button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex flex-row justify-center items-center text-2xl font-bold text-primary dark:text-white">
                <img className="mr-3 md:mr-0" src="./img/logo/logo.webp" width={100} alt="کاسب‌چی" />
            
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="relative mr-6 hidden md:block">
              <input
                type="text"
                placeholder="جستجو..."
                className="w-80 py-2 px-4 pr-10 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-[#f1e7dd] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Left side actions (in RTL) */}
          <div className="flex items-center">
            {/* Search Icon - Mobile */}
            <div className="md:hidden mr-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5 dark:text-white" />
              </Button>
            </div>

            {/* Theme Toggle with spacing */}
            <div className="mr-3">
              <ThemeToggle />
            </div>

            {/* Cart Button */}
            <div>
              <CartButton />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        {isSearchOpen && (
          <div className="md:hidden w-full py-2 px-4 border-b border-gray-200 dark:border-coffee-dark-accent/50 transition-all duration-300">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو..."
                className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 dark:border-coffee-dark-accent bg-white/50 dark:bg-coffee-dark-sidebar/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/70 transition-all duration-300"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        )}

        {/* Header Row 2 */}
        <div className="w-full py-2 px-4 sm:px-6 lg:px-8 hidden md:flex items-center justify-between">
          {/* Navigation Links */}
          <div className="flex space-x-6 space-x-reverse">
            {navigation.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.subCategories && setActiveDropdown(link.name)}
                onMouseLeave={() => link.subCategories && setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`text-md font-medium transition-colors hover:text-primary flex items-center ${pathname === link.href || (link.subCategories && pathname.startsWith(link.href))
                      ? "text-primary dark:text-yellow-400 border-b-2 border-primary dark:border-yellow-400"
                      : "text-gray-600 dark:text-gray-300"
                    }`}
                >
                  {link.name}
                  {link.subCategories && (
                    <ChevronDown className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {link.subCategories && activeDropdown === link.name && (
                  <div className="absolute right-0 pt-2 z-50">
                    <div className="w-64 bg-white dark:bg-coffee-dark-bg rounded-md shadow-lg py-2 border border-gray-200 dark:border-white">
                      <div className="grid grid-cols-1 gap-1">
                        {link.subCategories.map((subCategory) => (
                          <Link
                            key={subCategory.name}
                            href={subCategory.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black"
                          >
                            {subCategory.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional options can be added here */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/dashboard">
              <Button 
                variant="default" 
                className="bg-primary text-white font-bold px-6 py-2 rounded-lg shadow-lg border-2 border-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200 dark:bg-yellow-400 dark:text-black dark:border-yellow-400 dark:hover:bg-yellow-300"
                style={{ boxShadow: '0 4px 16px 0 rgba(255, 193, 7, 0.15)' }}
              >
                فروشنده شوید
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute right-0 left-0 w-full h-auto max-h-[80vh] overflow-y-auto py-4 px-4 bg-white dark:bg-coffee-dark-accent border-b border-gray-200 dark:border-coffee-dark-accent z-50">
            <div className="text-lg font-bold text-primary dark:text-primary mb-4 text-center">
              کاسب‌چی
            </div>
            <div className="flex flex-col space-y-3">
              {navigation.map((link) => (
                <div key={link.name} className="flex flex-col">
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-md font-medium ${pathname === link.href
                        ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                        : "text-gray-600 hover:bg-gray-100 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary"
                      }`}
                    onClick={() => !link.subCategories && setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>

                  {/* Mobile Submenu */}
                  {link.subCategories && (
                    <div className="mr-4 mt-1 mb-2 border-r-2 border-gray-200 dark:border-gray-700 pr-2">
                      {link.subCategories.map((subCategory) => (
                        <Link
                          key={subCategory.name}
                          href={subCategory.href}
                          className="block px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-md text-md font-bold bg-primary text-white shadow-lg border-2 border-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200 dark:bg-yellow-400 dark:text-black dark:border-yellow-400 dark:hover:bg-yellow-300 text-center"
              >
                فروشنده شوید
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
