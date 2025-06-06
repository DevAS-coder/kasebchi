import React from 'react'
import Image from 'next/image'

type TSERVICE = {
    name: string,
    description?: string,
    Image: string,
    category: string
}

function ServicesCard({service}: {service: TSERVICE}) {
    return (
        <div className='group flex items-center gap-6 p-5 min-w-[20rem] transition-all duration-300 
            bg-gray-50 hover:bg-white dark:bg-zinc-600 dark:hover:bg-zinc-800
            rounded-xl w-full max-w-md border border-transparent
            hover:border-gray-200 dark:hover:border-zinc-700'>
            
            {/* Image container */}
            <div className="relative flex-shrink-0 w-20 h-20">
                <Image
                    className='relative'
                    src={service.Image}
                    alt={service.name}
                    fill
                />
            </div>

            {/* Content container */}
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                    {service.name}
                </h3>
                {service.description && (
                    <p className="text-base text-gray-500 dark:text-gray-400 truncate">
                        {service.description}
                    </p>
                )}
            </div>

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
    )
}

export default ServicesCard