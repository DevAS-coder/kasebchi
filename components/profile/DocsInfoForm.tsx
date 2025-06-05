'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

function DocsInfoForm({
    refreshData
}: {
    refreshData: () => void;
}) {

    const [backNationalCard, setbackNationalCard] = useState<File | null>(null);    
    const [frontNationalCard, setfrontNationalCard] = useState<File | null>(null);
    const [Lisensce, setLisensce] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast()

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        let BNCPath = '';
        let FNPath = '';
        let LisenscePath = '';

        if (backNationalCard) {
            const extension = backNationalCard.name.split('.').pop();
            const fileName = `national_cards_back/BNC-${Date.now()}.${extension}`;
            const { data, error } = await supabase.storage
                .from('wholesaler-documents')
                .upload(fileName, backNationalCard);

            if (error) {
                toast.toast({
                    title: 'خطا در آپلود لوگو',
                    description: error.message,
                    className: 'bg-red-500 text-white',
                });
                setIsLoading(false);
                return;
            }

            BNCPath = fileName;
        }

        if (frontNationalCard) {
            const extension = frontNationalCard.name.split('.').pop();
            const fileName = `national_cards_front/FNC-${Date.now()}.${extension}`;
            const { data, error } = await supabase.storage
                .from('wholesaler-documents')
                .upload(fileName, frontNationalCard);

            if (error) {
                toast.toast({
                    title: 'خطا در آپلود فایل',
                    description: error.message,
                    className: 'bg-red-500 text-white',
                });
                setIsLoading(false);
                return;
            }

            FNPath = fileName;
        }

        if (Lisensce) {
            const extension = Lisensce.name.split('.').pop();
            const fileName = `Lisensce/Lisensce-${Date.now()}.${extension}`;
            const { data, error } = await supabase.storage
                .from('wholesaler-documents')
                .upload(fileName, Lisensce);

            if (error) {
                toast.toast({
                    title: 'خطا در آپلود فایل',
                    description: error.message,
                    className: 'bg-red-500 text-white',
                });
                setIsLoading(false);
                return;
            }

            LisenscePath = fileName;
        }

        const response = await fetch('/api/savewholesalerdocs', {
            method: 'POST',
            body: JSON.stringify({
                BNCPath,
                FNPath,
                LisenscePath,
            })
        });

        if (response.ok) {
            setIsLoading(false);
            toast.toast({
                title: 'موفق',
                description: 'اطلاعات با موفقیت ثبت شد',
                className: 'bg-green-500 text-white'
            })
            refreshData();
        } else {
            toast.toast({
                title: 'خطا',
                description: 'اطلاعات ثبت نشد',
                className: 'bg-red-500 text-white'
            })
            setIsLoading(false);
        }

    };


    return (
        <form onSubmit={submitForm} className='flex flex-col gap-2'>

            <div>
                <label htmlFor="backNationalCard">پشت کارت ملی</label>
                <Input
                    className='border-gray-600'
                    type="file"
                    id="backNationalCard"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            setbackNationalCard(file)
                        }
                    }}
                />

            </div>
            <div>
                <label htmlFor="frontNationalCard">جلوی کارت ملی</label>
                <Input
                    className='border-gray-600'
                    type="file"
                    id="frontNationalCard"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            setfrontNationalCard(file)
                        }
                    }}
                />

            </div>
            <div>
                <label htmlFor="Lisensce">جواز کسب</label>
                <Input
                    className='border-gray-600'
                    type="file"
                    id="Lisensce"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            setLisensce(file)
                        }
                    }}
                />

            </div>
            <Button type='submit'>
                {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : 'ارسال'}
            </Button>
        </form>
    );
}

export default DocsInfoForm;
