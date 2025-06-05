'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

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
    const [backNationalCardPreview, setBackNationalCardPreview] = useState<string | null>(null);
    const [frontNationalCardPreview, setFrontNationalCardPreview] = useState<string | null>(null);
    const [LisenscePreview, setLisenscePreview] = useState<string | null>(null);

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
            {/* Back National Card */}
            <div>
                <label htmlFor="backNationalCard" className="block mb-2">پشت کارت ملی</label>
                <div
                    className={cn(
                        "relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors",
                        "min-h-[150px] flex flex-col items-center justify-center gap-2"
                    )}
                    onClick={() => document.getElementById('backNationalCard')?.click()}
                >
                    <input
                        type="file"
                        id="backNationalCard"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setbackNationalCard(file);
                                setBackNationalCardPreview(URL.createObjectURL(file));
                            }
                        }}
                        className="hidden"
                    />
                    {backNationalCardPreview ? (
                        <div className="relative w-full h-full flex flex-col items-center">
                            <img
                                src={backNationalCardPreview}
                                alt="Back National Card preview"
                                className="max-h-[120px] object-contain mb-2"
                            />
                            <p className="text-sm text-gray-500">برای تغییر تصویر کلیک کنید</p>
                        </div>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 text-gray-400" />
                            <p className="text-sm text-gray-500">برای آپلود تصویر پشت کارت ملی کلیک کنید یا فایل را اینجا رها کنید</p>
                            <p className="text-xs text-gray-400">فرمت‌های مجاز: JPG، PNG</p>
                        </>
                    )}
                </div>
            </div>
            {/* Front National Card */}
            <div>
                <label htmlFor="frontNationalCard" className="block mb-2">جلوی کارت ملی</label>
                <div
                    className={cn(
                        "relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors",
                        "min-h-[150px] flex flex-col items-center justify-center gap-2"
                    )}
                    onClick={() => document.getElementById('frontNationalCard')?.click()}
                >
                    <input
                        type="file"
                        id="frontNationalCard"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setfrontNationalCard(file);
                                setFrontNationalCardPreview(URL.createObjectURL(file));
                            }
                        }}
                        className="hidden"
                    />
                    {frontNationalCardPreview ? (
                        <div className="relative w-full h-full flex flex-col items-center">
                            <img
                                src={frontNationalCardPreview}
                                alt="Front National Card preview"
                                className="max-h-[120px] object-contain mb-2"
                            />
                            <p className="text-sm text-gray-500">برای تغییر تصویر کلیک کنید</p>
                        </div>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 text-gray-400" />
                            <p className="text-sm text-gray-500">برای آپلود تصویر جلوی کارت ملی کلیک کنید یا فایل را اینجا رها کنید</p>
                            <p className="text-xs text-gray-400">فرمت‌های مجاز: JPG، PNG</p>
                        </>
                    )}
                </div>
            </div>
            {/* License */}
            <div>
                <label htmlFor="Lisensce" className="block mb-2">جواز کسب</label>
                <div
                    className={cn(
                        "relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors",
                        "min-h-[150px] flex flex-col items-center justify-center gap-2"
                    )}
                    onClick={() => document.getElementById('Lisensce')?.click()}
                >
                    <input
                        type="file"
                        id="Lisensce"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setLisensce(file);
                                setLisenscePreview(URL.createObjectURL(file));
                            }
                        }}
                        className="hidden"
                    />
                    {LisenscePreview ? (
                        <div className="relative w-full h-full flex flex-col items-center">
                            <img
                                src={LisenscePreview}
                                alt="License preview"
                                className="max-h-[120px] object-contain mb-2"
                            />
                            <p className="text-sm text-gray-500">برای تغییر تصویر کلیک کنید</p>
                        </div>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 text-gray-400" />
                            <p className="text-sm text-gray-500">برای آپلود تصویر جواز کسب کلیک کنید یا فایل را اینجا رها کنید</p>
                            <p className="text-xs text-gray-400">فرمت‌های مجاز: JPG، PNG</p>
                        </>
                    )}
                </div>
            </div>
            <Button type='submit'>
                {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : 'ارسال'}
            </Button>
        </form>
    );
}

export default DocsInfoForm;
