'use client'

import React from 'react'
import useSWR from 'swr'
import PartOfProfile from './PartOfProfile'

type WholesalerData = [string, any][]

const parts: Record<string, string> = {
  first_name: "نام",
  last_name: "نام خانوادگی",
  mobile: "شماره موبایل",
  national_code: "کد ملی",
  service_categories: "دسته بندی سرویس",
  level_1_auth : 'احراز هویت مرحله اول',
  level_2_auth : 'احراز هویت مرحله دوم'
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

function ProfileInfoTab() {
  const { data, error, isLoading } = useSWR('/api/getwholesalerdata', fetcher, {
    dedupingInterval: 60000,
  })
  
  if (isLoading) return (
    <div className='flex justify-center items-center min-h-[200px]'>
      <div className="animate-pulse text-gray-400">در حال بارگذاری...</div>
    </div>
  )
  
  if (error) return (
    <div className='flex justify-center items-center min-h-[200px]'>
      <div className='text-red-500 bg-red-50 px-4 py-2 rounded-lg'>خطا در دریافت اطلاعات</div>
    </div>
  )

  let wholesalerDataList: WholesalerData = Object.entries(data.data)
    .filter(([key]) => !["id", "created_at", "user_id"].includes(key))

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4'>
      {wholesalerDataList.map(([key, value], index) => {
        const title = parts[key] || key
        return <PartOfProfile key={index} title={title} value={value} />
      })}
    </div>
  )
}

export default ProfileInfoTab
