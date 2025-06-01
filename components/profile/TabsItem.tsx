import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    name: string,
    icon: React.ReactNode,
    segment: string
}

function TabsItem({ tabInfo }: { tabInfo: Props }) {
    const searchParams = useSearchParams()
    const tabParam = searchParams.get('tabName')
    const isActive = tabParam === tabInfo.segment

    return (
        <Link href={`/dashboard/profile?tabName=${tabInfo.segment}`} className="md:w-full w-auto">
            <div className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                whitespace-nowrap md:whitespace-normal 
                min-w-[140px] md:min-w-0
                transition-all duration-200 ease-in-out
                ${isActive 
                    ? 'bg-coffee-dark-bg text-white shadow-md' 
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }
            `}>
                {tabInfo.icon}
                <p className="text-sm font-medium">{tabInfo.name}</p>
            </div>
        </Link>
    )
}

export default TabsItem