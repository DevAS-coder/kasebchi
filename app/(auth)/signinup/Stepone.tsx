import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUsers } from '@/contexts/UserContext';
import Spinner from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SteponeProps {
    setSigninState: (state: number) => void;
}

function Stepone({ setSigninState }: SteponeProps) {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const { users, setUsers } = useUsers()
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (phoneNumber.length === 11) {
          checkPhoneExists(phoneNumber)
        } else {
          alert('شماره تلفن باید 11 رقم باشد.');
        }
    };

    const checkPhoneExists = async (phone: string) => {
        const { data } = await supabase.rpc('check_phone_exists', { p_phone: phone });
        if (data) {
            setSigninState(1);
            setUsers(prevUser => ({
                ...prevUser,
                phoneNumber,
                isExisted: true,
                password: '',
                role: '',
                isAuthenticated: false
            }));
            setIsLoading(false);
            
        } else {
            setSigninState(1);
            setUsers(prevUser => ({
                ...prevUser,
                phoneNumber,
                isExisted: false,
                password: '',
                role: '',
                isAuthenticated: false
            }));
            setIsLoading(false);
            
        }
        return data;
    };
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='absolute top-2 right-2 cursor-pointer' onClick={() => router.replace('/')}>بستن</h1>
      <Image src="/img/logo/logo.webp" width={100} height={100} alt="logo" />
      <h1 className="mt-6 font-extrabold text-3xl text-gray-800">ورود یا ثبت نام</h1>
      <p className="mt-3 text-gray-700 text-center">لطفا شماره موبایل خود را وارد کنید.</p>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="w-full mt-6 h-12 border-2 border-gray-300 rounded-3xl outline-none px-5 text-lg focus:border-green-500 transition-colors duration-300"
        placeholder="شماره موبایل"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button
        className="w-full mt-6 h-12 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-semibold rounded-3xl shadow-md"
        onClick={handleSubmit}
      >
        {isLoading ? (
          <Spinner/>
        ) : (
          'ارسال'
        )}
      </button>
    </div>

  );
}

export default Stepone;
