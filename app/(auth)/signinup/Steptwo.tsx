import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeftIcon } from 'lucide-react';
import { useUsers } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import Spinner from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SteptwoProps {
    setSigninState: (state: number) => void;
}

interface UserState {
    phoneNumber: string;
    isExisted: boolean;
    isAuthenticated: boolean;
    user_id?: string;
    role: string;
}

function Steptwo({ setSigninState }: SteptwoProps) {
    const [password, setpassword] = useState<string>('');
    const { users, setUsers } = useUsers()
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        setIsLoading(true)
        e.preventDefault();
        if (users.isExisted) {
            authUser(users.phoneNumber, password);
        } else {
            checkPhoneExists(users.phoneNumber, password, 'wholesaler');
        }
    };

    const checkPhoneExists = async (phone: string, password: string, role: string) => {
        const { data, error } = await supabase.rpc('register_user', { p_phone: phone, p_password: password, p_role: role });

        if (error) {
            console.log(error);

        } else {

            toast.toast({
                title: 'تبریک',
                description: 'به کاسبچی خوش آمدید',
                variant: 'default',
                className: 'bg-green-500 text-white',
            });
            users.isAuthenticated = true;
            users.user_id = data.user_id;
            users.role = 'wholesaler';
            setUsers(users);
            localStorage.setItem('auth', JSON.stringify({ users }));
            
            router.replace('/dashboard');
            setIsLoading(false)

        }
        return data;
    };
    const authUser = async (phone: string, password: string) => {
        const { data, error } = await supabase.rpc('authenticate_user', { p_phone: phone, p_password: password });

        if (error) {
            console.log(error);

        } else {
            if (data.success) {
                toast.toast({
                    title: 'تبریک',
                    description: 'به کاسبچی خوش آمدید',
                    variant: 'default',
                    className: 'bg-green-500 text-white',
                });
                users.isAuthenticated = true;
                users.role = 'wholesaler';
                users.user_id = data.user_id;
                setUsers(users);
                localStorage.setItem('auth', JSON.stringify({ users }));
                router.replace('/dashboard');
            } else {
                toast.toast({
                    title: 'خطا',
                    description: 'شماره تلفن یا رمز عبور اشتباه است',
                    variant: 'destructive',
                    className: 'bg-red-500 text-white',
                });
            }
        }
        setIsLoading(false)
        return data;
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <Image src="/img/logo/logo.webp" width={100} height={100} alt="logo" />
            <ArrowLeftIcon className='absolute top-2 left-2 cursor-pointer' onClick={() => setSigninState(0)} />
            {users.isExisted ? <h1 className="mt-6 font-extrabold text-md text-gray-800">خوش آمدید! رمز ورود خود را وارد کنید</h1>
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
