"use client"
import OverviewCard from '@/components/dashboard/OverviewCard'
import { PackageCheck, ShoppingCart, Users2 } from 'lucide-react'
import SalesChart from '@/components/dashboard/SalesChart'
import RecentOrders from '@/components/dashboard/RecentOrders'
import { useLayoutEffect, useState } from 'react'
import FromAuthLevelOne from '@/components/dashboard/FromAuthLevelOne'

function Dashboard() {

  const [wholesalerData, setWholesalerData] = useState(null);
  const [wholesalerExisted, setwholesalerExisted] = useState(true);
  const [isFetched, setIsFetched] = useState(false);

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch('/api/getuserdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      return data;
    };
    
    const handle = async () => {
      const userData = await fetchUserData();
      if (userData.payload.id) {
        const wholesalerRes = await fetch('/api/checkwholesaler', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ wholesalerId: userData.payload.id })
        });
        const wholesalerData = await wholesalerRes.json();
        setWholesalerData(wholesalerData.data);
        setwholesalerExisted(wholesalerData.success);
      } else {
        setwholesalerExisted(false);
      }
      setIsFetched(true); 
    };
    
    handle();    
    
  },[])

  if (!isFetched) return <div className='flex justify-center items-center h-screen text-black'>در حال اعتبارسنجی اطلاعات...</div>;

  return (
    <>
      {wholesalerExisted ? (
          <div className="mt-16 p-6 grid gap-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <OverviewCard title="موجودی کل" value="۱۵۰ بسته" icon={<PackageCheck />} />
              <OverviewCard title="مشتریان فعال" value="۲۴ مشتری" icon={<Users2 />} />
              <OverviewCard title="سفارش‌های امروز" value="۵ سفارش" icon={<ShoppingCart />} />
            </div>

            <SalesChart />
            <RecentOrders />
          </div>
      ) : (
        <div className=" p-6 flex justify-center items-center h-screen gap-4 w-full">
          <FromAuthLevelOne />
        </div>
      )}
    </>
  )
}

export default Dashboard
