"use client"
import DashNavbar from '@/components/dashboard/DashNavbar';
import React, { useLayoutEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

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
        <div>
          <DashNavbar />
          {children}
        </div>
      ) : (
        <div>
          {children}
        </div>
      )}
    </>
  );
};

export default Layout;
