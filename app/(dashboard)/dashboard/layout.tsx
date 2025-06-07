"use client"
import DashNavbar from '@/components/dashboard/DashNavbar';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

type WholesalerData = {
  data?: {
    level_2_auth?: boolean;
  };
};

const Layout = ({ children }: LayoutProps) => {

  const [wholesalerData, setWholesalerData] = useState<WholesalerData | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
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
      if(userData.error) {
        redirect('/login')
      }
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

        if (!wholesalerData.success) {
          redirect('/wholesalerauthlvlone')
        } else {
          setIsFetched(true);
        }
      }
      
    };

    handle();

  }, [])

  if (!isFetched) return (
    <div className='dark:bg-coffee-dark-bg dark:text-white flex justify-center items-center h-screen text-black'>
      <p>در حال اعتبارسنجی اطلاعات...</p>
    </div>
  );

  return (
    <>

      <div>
        <DashNavbar />
        {!wholesalerData?.data?.level_2_auth && <div className='absolute top-16 text-center left-0 w-full p-5 bg-red-500 text-white'>
          <p>احراز هویت مرحله دوم انجام نشده است و شما نمیتوانید از پنل خود استفاده کنید</p>
        </div>}
        <div className={`${!wholesalerData?.data?.level_2_auth ? 'mt-20 md:mt-16' : ''}`}>
        {children}

        </div>
      </div>

    </>
  );
};

export default Layout;
