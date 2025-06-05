'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Button } from '../ui/button';
import Modal from '../ui/modal';
import DocsInfoForm from './DocsInfoForm';
import PartOfProfile from './PartOfProfile';

const parts = {
  national_card_front_url: "جلوی کارت ملی",
  national_card_back_url: "پشت کارت ملی",
  business_license_url: "جواز کسب",
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();
  console.log(data.data);

  return data.data;
};

function ProfileDocumentsTab() {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSWR('/api/getwholesalerdocs', fetcher, {
    dedupingInterval: 60000,
  });

  const refreshData = () => {
    setModalOpen(false)
    mutate()
  }

  console.log(data);

  if (isLoading || isValidating) return (
    <div className='flex justify-center items-center min-h-[200px]'>
      <div className="animate-pulse text-gray-400">در حال بارگذاری...</div>
    </div>
  );

  if (error) return (
    <div className='flex justify-center items-center min-h-[200px]'>
      <div className="animate-pulse text-red-400">خطا در بارگذاری اطلاعات</div>
    </div>
  );

  if (data === null) {
    return (
      <div className='flex flex-col gap-4 justify-center items-center min-h-[200px]'>
        <div> مدارک ثبت نشده است</div>
        <Button onClick={() => setModalOpen(true)} className='text-white'>
          ثبت مدارک
        </Button>

        {modalOpen && (
          <Modal open={modalOpen} onOpenChange={setModalOpen} title="فرم ثبت مدارک">
            <DocsInfoForm
              refreshData={refreshData}
            />
          </Modal>
        )}

      </div>
    );
  }

  return (
    <>
      <div className=" text-zinc-700">اطلاعات مدارک شما:</div>
      <div className='p-4 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Object.entries(data).filter(([key]) => !["id", "uploaded_at", "user_id"].includes(key)).map(([key, value]) => (
          <PartOfProfile key={key} title={parts[key as keyof typeof parts]} value={value} />
        ))}
      </div>
    </>
  );
}

export default ProfileDocumentsTab;
