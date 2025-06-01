import { DollarSign, Factory, File, User } from 'lucide-react'
import React from 'react'
import TabsItem from './TabsItem'

const tabs = [
    {
        name: 'اطلاعات هویتی',
        icon: <User />,
        segment: 'personal_information'
    },
    {
        name: 'اطلاعات کسب و کار',
        icon: <Factory />,
        segment: 'account_information'
    },
    {
        name: 'اطلاعات مالی',
        icon: <DollarSign />,
        segment: 'financial_information'
    },
    {
        name: 'مدارک',
        icon: <File />,
        segment: 'documents'
    }
]

function ProfileTabs() {
  return (
    <div className='flex flex-row md:flex-col right-0 bg-gray-100 md:w-80 w-full overflow-x-auto md:overflow-x-hidden'>
        {tabs.map((tab, index) => (
            <TabsItem tabInfo={tab} key={index}/>
        ))}
    </div>
  )
}

export default ProfileTabs