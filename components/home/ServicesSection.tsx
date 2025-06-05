"use client";

import React, { useEffect, useState } from 'react'
import ServicesCard from '../shared/ServicesCard'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

function ServicesSection() {
    const services = [
        { name: 'دان قهوه', Image: '/img/services/service-coffee.webp', category: 'needs', url:'coffee-beans' },
        { name: 'تجهیزات صنعتی', Image: '/img/services/service-equipment.webp', category: 'needs', url:'equipment' },
        { name: 'ظروف کافه', Image: '/img/services/service-dishes.webp', category: 'needs', url:'dishes' },
        { name: 'ظروف یکبار مصرف', Image: '/img/services/service-disposable.webp', category: 'needs', url:'disposable' },
        { name: 'کیک و دسر', Image: '/img/services/service-dessert.webp', category: 'needs', url:'dessert' },
        { name: 'طراح دکور', Image: '/img/services/service-decor.webp', category: 'decor', url:'decor' },
        { name: 'طراح منو', Image: '/img/services/service-menu.webp', category: 'decor', url:'menu-designer'    },
        { name: 'راه‌اندازی کافه', Image: '/img/services/service-setup.webp', category: 'decor', url:'cafe-setup'    },
        { name: 'کارشناس فروش', Image: '/img/services/service-sales.webp', category: 'support', url:'sales-expert' },
        { name: 'نیروی انسانی', Image: '/img/services/service-staff.webp', category: 'support', url:'staff' },
        { name: 'تعمیرات', Image: '/img/services/service-repair.webp', category: 'support', url:'repairs' },
        { name: 'پشتیبانی', Image: '/img/services/service-support.webp', category: 'support', url:'support' },
    ]

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

                    <div className='gap-2 -mb-7 flex-wrap flex justify-center items-center md:gap-5 mt-3'>
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

                    <div className='grid md:grid-cols-5 gap-5 mt-10'>
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
