import { DollarSign, Factory, File, User } from 'lucide-react'
import React from 'react'
import TabsItem from './TabsItem'

const tabs = [
    {
        name: 'اطلاعات هویتی',
        icon: <User className="w-5 h-5" />,
        segment: 'personal_information'
    },
    {
        name: 'اطلاعات کسب و کار',
        icon: <Factory className="w-5 h-5" />,
        segment: 'account_information'
    },
    {
        name: 'اطلاعات مالی',
        icon: <DollarSign className="w-5 h-5" />,
        segment: 'financial_information'
    },
    {
        name: 'مدارک',
        icon: <File className="w-5 h-5" />,
        segment: 'documents'
    }
]

function ProfileTabs() {
  return (
    <div className='flex flex-row md:flex-col bg-gray-50 md:w-72 w-full overflow-x-auto md:overflow-x-hidden md:h-full p-2 gap-2'>
        {tabs.map((tab, index) => (
            <TabsItem tabInfo={tab} key={index}/>
        ))}
    </div>
  )
}

export default ProfileTabs