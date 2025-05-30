import React, { useEffect, useState } from 'react'
import PartOdd from './PartOdd';
import PartEven from './PartEven';

type WholesalerData = [string, any][];

const parts = {
  first_name: "نام",
  last_name: "نام خانوادگی",
  mobile: "شماره موبایل",
  national_code: "کد ملی",
  service_category: "دسته بندی سرویس",
}

function ProfileInfoTab() {
  const [wholesalerData, setWholesalerData] = useState<WholesalerData | null>(null);

  useEffect(() => {
    const fetchWholesalerData = async () => {
      const response = await fetch("/api/getwholesalerdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.data);

      let wholesalerDataList = Object.entries(data.data);
      wholesalerDataList = wholesalerDataList.filter(([key, value]) => key !== "id" && key !== "created_at" && key !== "user_id" && key !== "level_1_auth"  && key !== "level_2_auth");
      
      setWholesalerData(wholesalerDataList);
    };
    fetchWholesalerData();
  }, [])

  if (!wholesalerData) return <div className='flex justify-center items-center h-screen'>در حال بارگذاری...</div>;

  return (
    <div className='grid grid-cols-2'>
      {wholesalerData.map(([key, value], index) => (
        index % 2 === 0 ? (
          <PartOdd title={parts[key as keyof typeof parts]} value={value} />
        ) : (
          <PartEven title={parts[key as keyof typeof parts]} value={value} />
        )
        ))
        
      }
    </div>
  )
}

export default ProfileInfoTab;
