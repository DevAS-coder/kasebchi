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

    return (
        <Link href={`/dashboard/profile?tabName=${tabInfo.segment}`} className="md:w-full w-auto">
            <div className={`text-white px-3 md:px-4 py-3 md:py-4 border-b-2 md:border-b-2 cursor-pointer duration-300 border-black rounded-lg flex items-center gap-2 whitespace-nowrap md:whitespace-normal min-w-[150px] md:min-w-0 ${tabParam === tabInfo.segment ? 'bg-coffee-dark-bg/90' : 'bg-coffee-dark-bg/50 hover:bg-coffee-dark-bg/70'}`}>
                {tabInfo.icon}
                <p className="text-sm md:text-base">{tabInfo.name}</p>
            </div>
        </Link>
    )
}

export default TabsItem