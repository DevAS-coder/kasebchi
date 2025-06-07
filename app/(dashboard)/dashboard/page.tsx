"use client"
import OverviewCard from '@/components/dashboard/OverviewCard'
import { PackageCheck, ShoppingCart, Users2 } from 'lucide-react'
import SalesChart from '@/components/dashboard/SalesChart'
import RecentOrders from '@/components/dashboard/RecentOrders'

function Dashboard() {

  return (
    <div className="mt-28 p-6 grid gap-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OverviewCard title="موجودی کل" value="۰ محصول" icon={<PackageCheck />} />
        <OverviewCard title="مشتریان فعال" value="۰ مشتری" icon={<Users2 />} />
        <OverviewCard title="سفارش‌های امروز" value="۰ سفارش" icon={<ShoppingCart />} />
      </div>

      <SalesChart />
      <RecentOrders />
    </div>
  )
}

export default Dashboard
