'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type TSERVICE = {
    name: string,
    description?: string,
    Image: string,
    category: string
}

function ServicesCard({ service }: { service: TSERVICE }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [forceRightSide, setForceRightSide] = useState(false)

    useEffect(() => {
        const checkPosition = () => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect()
                const spaceLeft = rect.left
                // اگر فضای چپ کمتر از 300px بود، Tooltip بره راست
                setForceRightSide(spaceLeft < 300)
            }
        }

        checkPosition()
        window.addEventListener('resize', checkPosition)
        return () => window.removeEventListener('resize', checkPosition)
    }, [])

    return (
        <div ref={cardRef} className="relative group w-full max-w-md">
            {/* کارت اصلی */}
            <div className='flex flex-col items-center gap-5 p-5 min-w-[20rem] transition-all duration-300 
                bg-gray-50 hover:bg-white dark:bg-zinc-600 dark:hover:bg-zinc-800
                rounded-xl w-full border border-transparent
                hover:border-gray-200 dark:hover:border-zinc-700'>

                <div className='flex flex-row justify-between items-center w-full'>

                <div className="relative flex-shrink-0 w-20 h-20">
                    <Image
                        className='relative'
                        src={service.Image}
                        alt={service.name}
                        fill
                    />
                </div>

                {/* نام سرویس */}
                <div className="">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        {service.name}
                    </h3>
                </div>

                {/* آیکون */}
                <div>
                    <svg
                    className="w-6 h-6 text-gray-400 transition-transform duration-300 rotate-180 group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
                </div>
                </div>
                <div className='md:hidden'>
                    {service.description}
                </div>
            </div>

            {/* Tooltip */}
            {service.description && (
                <div className={`
                        absolute top-1/2
                        ${forceRightSide
                        ? 'left-full ml-4 translate-x-4 group-hover:translate-x-0'
                        : 'right-64 mr-4 -translate-x-4 group-hover:translate-x-0'}
                        -translate-y-1/2
                        opacity-0 group-hover:opacity-100
                        pointer-events-none group-hover:pointer-events-auto
                        transition-all duration-300 ease-in-out
                        w-64 p-3 rounded-lg shadow-lg
                        bg-white dark:bg-zinc-900 text-sm text-gray-700 dark:text-gray-300 z-50
                        `}>
                    {service.description}
                </div>

            )}
        </div>
    )
}

export default ServicesCard
