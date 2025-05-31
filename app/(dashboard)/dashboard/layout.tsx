"use client"
import DashNavbar from '@/components/dashboard/DashNavbar';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  const [wholesalerData, setWholesalerData] = useState(null);
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
      console.log('this is data', data);
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
    <div className='flex justify-center items-center h-screen text-black'>
      <p>در حال اعتبارسنجی اطلاعات...</p>
    </div>
  );

  return (
    <>

      <div>
        <DashNavbar />
        {children}
      </div>

    </>
  );
};

export default Layout;
