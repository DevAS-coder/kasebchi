'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function BusinessInfoForm({
  refreshData
}: {
  refreshData: () => void;
}) {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [about, setAbout] = useState('');
    const [logo, setLogo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast()

    const submitForm = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch('/api/savewholesalerbusinessinfo', {
            method: 'POST',
            body: JSON.stringify({
                name,
                address,
                phone,
                website,
                about,
                logo,
            })
        });

        if (response.ok) {
            setIsLoading(false);
            toast.toast({
                title: 'موفق',
                description: 'اطلاعات با موفقیت ثبت شد',
                className : 'bg-green-500 text-white'
            })
            refreshData();
        } else {
            toast.toast({
                title: 'خطا',
                description: 'اطلاعات ثبت نشد',
                className : 'bg-red-500 text-white'
            })
            setIsLoading(false);
        }

      };
      

  return (
    <form onSubmit={submitForm} className='flex flex-col gap-2'>
      <div>
        <label htmlFor="name">نام کسب و کار</label>
        <Input className='border-gray-600' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="address">آدرس فروشگاه</label>
        <Input className='border-gray-600' type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label htmlFor="phone">شماره تلفن</label>
        <Input className='border-gray-600' type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label htmlFor="website">وبسایت</label>
        <Input className='border-gray-600' type="text" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div>
        <label htmlFor="about">درباره فروشگاه</label>
        <Input className='border-gray-600' type="text" id="about" value={about} onChange={(e) => setAbout(e.target.value)} />
      </div>
      <div>
        <label htmlFor="logo">لوگو</label>
        <Input className='border-gray-600' type="file" id="logo" />
      </div>
      <Button type='submit'>
        {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : 'ارسال'}
      </Button>
    </form>
  );
}

export default BusinessInfoForm;
