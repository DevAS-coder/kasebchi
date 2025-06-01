"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOutIcon } from "lucide-react";
import ThemeToggle from "../layout/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { mutate } from "swr";

const navigation = [
  { name: "محصولات", href: "/dashboard/products" },
  { name: "سفارشات", href: "/dashboard/orders" },
  { name: "گزارشات", href: "/dashboard/analytics" },
  { name: "تنظیمات", href: "/dashboard/settings" },
];

const DashNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const handleLogOut = async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    mutate('/api/getwholesalerdata')
  }

  return (
    <header
      className={`absolute w-full top-0 z-40 transition-all duration-300 bg-white dark:bg-coffee-dark-bg ${scrolled ? "shadow-md" : ""
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 " />
                ) : (
                  <Menu className="h-6 w-6 dark:text-white" />
                )}
              </Button>
            </div>
            <Link href="/dashboard" className="flex items-center">
              <div className="flex flex-row justify-center md:border-l-2 pl-4 border-white items-center text-2xl font-bold text-primary dark:text-white">
                <div className="hidden md:block relative w-[40px] h-[40px]">
                  <Image
                    src="/img/logo/logo.webp"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h1 className="text-primary mr-3 dark:text-white text-lg">پنل فروشندگان</h1>
              </div>
            </Link>

            <div className="hidden md:flex justify-center flex-1">
              <div className="flex space-x-8 space-x-reverse">
                {navigation.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-lg font-medium transition-colors ${location.pathname === link.href
                      ? "text-primary dark:text-yellow-400 border-b-2 border-primary dark:border-yellow-400"
                      : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-yellow-400"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Centered Navigation Links */}

          {/* Right side actions */}
          <div className="flex items-center md:space-x-4 space-x-reverse">
            <ThemeToggle />
            <Link href="/dashboard/profile?tabName=personal_information">
              <Button variant="ghost" className=" dark:text-gray-300 dark:hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className=" dark:text-gray-300 dark:hover:text-primary" onClick={handleLogOut}>
                <h1 className="hidden md:block">خروج</h1>
                <LogOutIcon className="h-5 w-5" />
              </Button>
            </Link>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-96 h-96 py-4 px-2 bg-white dark:bg-coffee-dark-accent border-b border-gray-200 dark:border-coffee-dark-accent">
            <div className="text-lg font-bold text-primary dark:text-primary mb-4 text-center">
              کاسب‌چی
            </div>
            <div className="flex flex-col space-y-3">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-md font-medium ${location.pathname === link.href
                    ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default DashNavbar;
