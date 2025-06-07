"use client";

import React, { useEffect, useState } from 'react'
import ServicesCard from '../shared/ServicesCard'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

function ServicesSection() {
    const services = [
        { 
            name: 'دان قهوه', 
            Image: '/img/services/service-coffee.webp', 
            category: 'needs', 
            url: 'coffee-beans',
            description: 'انواع دانه‌های قهوه با کیفیت از بهترین مزارع دنیا مناسب برای کافه شما.'
        },
        { 
            name: 'تجهیزات صنعتی', 
            Image: '/img/services/service-equipment.webp', 
            category: 'needs', 
            url: 'equipment',
            description: 'تامین تجهیزات صنعتی حرفه‌ای برای راه‌اندازی یا ارتقای کافه شما.'
        },
        { 
            name: 'ظروف کافه', 
            Image: '/img/services/service-dishes.webp', 
            category: 'needs', 
            url: 'dishes',
            description: 'ارائه انواع ظروف سرامیکی، شیشه‌ای و خاص برای سرو نوشیدنی‌ها و خوراکی‌ها.'
        },
        { 
            name: 'ظروف یکبار مصرف', 
            Image: '/img/services/service-disposable.webp', 
            category: 'needs', 
            url: 'disposable',
            description: 'انواع ظروف یکبار مصرف زیبا، کاربردی و مناسب محیط زیست.'
        },
        { 
            name: 'کیک و دسر', 
            Image: '/img/services/service-dessert.webp', 
            category: 'needs', 
            url: 'dessert',
            description: 'تنوعی از کیک‌ها و دسرهای خانگی و تخصصی ویژه منوی کافه.'
        },
        { 
            name: 'طراح دکور', 
            Image: '/img/services/service-decor.webp', 
            category: 'decor', 
            url: 'decor',
            description: 'طراحی فضای داخلی و دکور منحصر‌به‌فرد برای خلق تجربه‌ای خاص در کافه شما.'
        },
        { 
            name: 'طراح منو', 
            Image: '/img/services/service-menu.webp', 
            category: 'decor', 
            url: 'menu-designer',
            description: 'طراحی منوی تخصصی بر اساس سبک کافه، سلیقه مشتری و اصول فروش.'
        },
        { 
            name: 'راه‌اندازی کافه', 
            Image: '/img/services/service-setup.webp', 
            category: 'decor', 
            url: 'cafe-setup',
            description: 'از ایده تا افتتاح؛ مشاوره و اجرای کامل پروژه راه‌اندازی کافه.'
        },
        { 
            name: 'کارشناس فروش', 
            Image: '/img/services/service-sales.webp', 
            category: 'support', 
            url: 'sales-expert',
            description: 'مشاور فروش جهت افزایش بهره‌وری، جذب مشتری و سوددهی بیشتر کافه.'
        },
        { 
            name: 'نیروی انسانی', 
            Image: '/img/services/service-staff.webp', 
            category: 'support', 
            url: 'staff',
            description: 'تامین باریستا، ویتر و نیروی ماهر با آموزش‌های تخصصی برای کافه.'
        },
        { 
            name: 'تعمیرات', 
            Image: '/img/services/service-repair.webp', 
            category: 'support', 
            url: 'repairs',
            description: 'خدمات تعمیر و نگهداری تجهیزات تخصصی کافه با پشتیبانی سریع.'
        },
        { 
            name: 'پشتیبانی', 
            Image: '/img/services/service-support.webp', 
            category: 'support', 
            url: 'support',
            description: 'پاسخگویی، پیگیری و پشتیبانی مداوم برای رفع نیازهای کافه‌داران.'
        }
    ];


    const [isVisible, setIsVisible] = useState(false)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('services-section')
            if (section) {
                const rect = section.getBoundingClientRect()
                const isInView = rect.top <= window.innerHeight * 0.75
                setIsVisible(isInView)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const filteredServices =
        filter === 'all'
            ? services
            : services.filter(service => service.category === filter)

    return (
        <section
            id='services-section'
            className='py-16 bg-white dark:bg-coffee-dark-bg border-b-2 border-primary'
        >
            <div className='container mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h2 className='text-4xl font-bold text-center text-coffee-dark dark:text-white'>
                        خدمات کاسب‌چی
                    </h2>

                    <div className='w-3/4 md:w-2/4 mx-auto grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-5 mt-3'>
                        {['all', 'needs', 'decor', 'support'].map(type => (
                            <button
                                key={type}
                                className='bg-yellow-400 px-5 py-1 text-xl rounded-3xl hover:bg-yellow-600 transition-all duration-300'
                                onClick={() => setFilter(type)}
                            >
                                {{
                                    all: 'همه',
                                    needs: 'تامین',
                                    decor: 'طراحی',
                                    support: 'پشتیبانی',
                                }[type]}
                            </button>
                        ))}
                    </div>

                    <div className='grid md:grid-cols-4 gap-5 mt-10'>
                        <AnimatePresence mode='wait'>
                            {filteredServices.map(service => (
                                <motion.div
                                    key={service.name}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className='flex flex-col md:flex-row items-center'
                                >
                                    <Link href={`/categories/${service.url}`}>
                                        <ServicesCard service={service} />
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ServicesSection
