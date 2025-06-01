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
            setTimeout(() => {
                toast.toast({
                    title: 'تبریک',
                    description: 'به کاسبچی خوش آمدید',
                    variant: 'default',
                    className: 'bg-green-500 text-white',
                });
                console.log('pushing to dashboard');
                router.push('/dashboard')
            }, 1000);

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
            <Image src="/img/logo/logo.webp" width={100} height={100} alt="logo" className="drop-shadow-lg" />
            <ArrowLeftIcon className='absolute top-2 left-2 cursor-pointer text-white/80 hover:text-white transition-colors duration-300' onClick={() => setSigninState(0)} />
            {user.isExisted ? 
                <h1 className="mt-6 font-extrabold text-2xl text-white">خوش آمدید!</h1>
            :
                <h1 className="mt-6 font-extrabold text-2xl text-white">به کاسبچی خوش آمدید</h1>
            }
            <p className="mt-3 text-white/90 text-center">لطفا رمز خود را وارد کنید.</p>
            <input
                type="password"
                className="w-full mt-6 h-12 bg-white/10 border-2 border-white/20 rounded-3xl outline-none px-5 text-lg text-white placeholder-white/50 focus:border-white/40 transition-colors duration-300"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
            />
            <button
                className="w-full mt-6 h-12 bg-[#8B4513] hover:bg-[#A0522D] transition-colors duration-300 text-white font-semibold rounded-3xl shadow-md warm-glow"
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
