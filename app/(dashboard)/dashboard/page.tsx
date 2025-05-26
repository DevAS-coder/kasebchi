"use client"
import { useLayoutEffect, useState } from 'react'
import Signinup from '@/app/(auth)/signinup/page'
import OverviewCard from '@/components/dashboard/OverviewCard'
import { PackageCheck, ShoppingCart, Users2 } from 'lucide-react'
import SalesChart from '@/components/dashboard/SalesChart'
import RecentOrders from '@/components/dashboard/RecentOrders'
import { useRouter } from 'next/navigation'

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useLayoutEffect(() => {
    document.title = 'کاسب‌چی | داشبورد'

    const authData = localStorage.getItem('auth')

    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData)

        if (parsedAuth.users.isAuthenticated && parsedAuth.users.role === 'wholesaler') {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          router.replace('/signinup')
        }
      } catch (error) {
        console.error("Failed to parse auth data:", error)
        setIsAuthenticated(false)
        localStorage.removeItem('auth')
        router.replace('/signinup')
      }
    } else {
      setIsAuthenticated(false)
      router.replace('/signinup')
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-primary">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <>
      {isAuthenticated ? (
          <div className="mt-16 p-6 grid gap-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <OverviewCard title="موجودی کل" value="۱۵۰ بسته" icon={<PackageCheck />} />
              <OverviewCard title="مشتریان فعال" value="۲۴ مشتری" icon={<Users2 />} />
              <OverviewCard title="سفارش‌های امروز" value="۵ سفارش" icon={<ShoppingCart />} />
            </div>

            <SalesChart />
            <RecentOrders />
          </div>

      ) :
        <Signinup />

      }
    </>
  )
}

export default Dashboard
