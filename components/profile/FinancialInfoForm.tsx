'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function FinancialInfoForm({
  refreshData
}: {
  refreshData: () => void;
}) {

    const [bankname, setbankName] = useState('');
    const [cardNumber, setcardNumber] = useState('');
    const [shebaNumber, setshebaNumber] = useState('');
    const [accountHolderName, setaccountHolderName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast()

    const submitForm = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch('/api/savewholesalerfinancial', {
            method: 'POST',
            body: JSON.stringify({
                bankname,
                cardNumber,
                shebaNumber,
                accountHolderName,
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
    <form onSubmit={submitForm} className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 md:mt-20 w-full md:w-[50%]'>
      <div>
        <label htmlFor="name">نام بانک</label>
        <Input className='border-gray-600' type="text" id="name" value={bankname} onChange={(e) => setbankName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="address">شماره کارت</label>
        <Input className='border-gray-600' type="text" id="address" value={cardNumber} onChange={(e) => setcardNumber(e.target.value)} />
      </div>
      <div>
        <label htmlFor="phone">شماره شبا</label>
        <Input className='border-gray-600' type="text" id="phone" value={shebaNumber} onChange={(e) => setshebaNumber(e.target.value)} />
      </div>
      <div>
        <label htmlFor="website">نام صاحب کارت</label>
        <Input className='border-gray-600' type="text" id="website" value={accountHolderName} onChange={(e) => setaccountHolderName(e.target.value)} />
      </div>
      <Button type='submit' className='md:col-span-2 mt-5 md:mt-0'>
        {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : 'ارسال'}
      </Button>
    </form>
  );
}

export default FinancialInfoForm;
