import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { useUsers } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import Spinner from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SteptwoProps {
    setSigninState: (state: number) => void;
}

function Steptwo({ setSigninState }: SteptwoProps) {
    const [password, setpassword] = useState<string>('');
    const { user } = useUsers()
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        setIsLoading(true)
        e.preventDefault();
        registerUser(user.phoneNumber, password, 'wholesaler');
    };

    const registerUser = async (phone: string, password: string, role: string) => {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ phoneNumber: phone, password: password, role: 'wholesaler', isExisted: user.isExisted })
        })

        const data = await response.json()

        if (data.success) {
            toast.toast({
                title: 'تبریک',
                description: 'به کاسبچی خوش آمدید',
                variant: 'default',
                className: 'bg-green-500 text-white',
            });
            router.push('/dashboard')
        } else {
            
            toast.toast({
                title: 'متاسفیم',
                description: 'رمز عبور اشتباه',
                variant: 'default',
                className: 'bg-red-500 text-white',
            });
            setIsLoading(false)
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <Image src="/img/logo/logo.webp" width={100} height={100} alt="logo" />
            <ArrowLeftIcon className='absolute top-2 left-2 cursor-pointer' onClick={() => setSigninState(0)} />
            {user.isExisted ? <h1 className="mt-6 font-extrabold text-md text-gray-800">خوش آمدید! رمز ورود خود را وارد کنید</h1>
                :
                <h1 className="mt-6 font-extrabold text-md text-gray-800">خوشحالیم که شما در حال عضو شدن به کاسبچی هستید</h1>
            }
            <p className="mt-3 text-gray-700 text-center">لطفا رمز خود را وارد کنید.</p>
            <input
                type="password"
                className="w-full mt-6 h-12 border-2 border-gray-300 rounded-3xl outline-none px-5 text-lg focus:border-green-500 transition-colors duration-300"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
            />
            <button
                className="w-full mt-6 h-12 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-semibold rounded-3xl shadow-md"
                onClick={handleSubmit}
            >
                {isLoading ? (
                    <Spinner />
                ) : (
                    'ورود'
                )}
            </button>
        </div>

    );
}

export default Steptwo;
