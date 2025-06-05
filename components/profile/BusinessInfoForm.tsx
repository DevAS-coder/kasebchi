'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

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
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    let logoPath = '';
  
    if (logoFile) {
      const extension = logoFile.name.split('.').pop(); // استخراج پسوند فایل
      const fileName = `logos/${Date.now()}.${extension}`; // اضافه کردن پسوند
      const { data, error } = await supabase.storage
        .from('logos')
        .upload(fileName, logoFile);
  
      if (error) {
        toast.toast({
          title: 'خطا در آپلود لوگو',
          description: error.message,
          className: 'bg-red-500 text-white',
        });
        setIsLoading(false);
        return;
      }
  
      logoPath = fileName;
    }  

      const response = await fetch('/api/savewholesalerbusinessinfo', {
        method: 'POST',
        body: JSON.stringify({
          name,
          address,
          phone,
          website,
          about,
          logoPath,
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
          <label htmlFor="logo" className="block mb-2">لوگو</label>
          <div 
            className={cn(
              "relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors",
              "min-h-[150px] flex flex-col items-center justify-center gap-2"
            )}
            onClick={() => document.getElementById('logo')?.click()}
          >
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            
            {previewUrl ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <img 
                  src={previewUrl} 
                  alt="Logo preview" 
                  className="max-h-[120px] object-contain mb-2"
                />
                <p className="text-sm text-gray-500">برای تغییر تصویر کلیک کنید</p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-500">برای آپلود لوگو کلیک کنید یا فایل را اینجا رها کنید</p>
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

  export default BusinessInfoForm;
