"use client"
import React, { useState } from 'react'
import { X } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function FromAuthLevelOne() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [nationalId, setNationalId] = useState<string>("")
  const toast = useToast()
  const router = useRouter()

  const categories = [
    { value: 'coffee_beans', label: 'دان قهوه' },
    { value: 'industrial_equipment', label: 'تجهیزات' },
    { value: 'cafe_vessels', label: 'ظروف کافه' },
    { value: 'cakes_and_desserts', label: 'کیک و دسر' },
    { value: 'decor_designers', label: 'طراحی دگور' },
    { value: 'menu_designers', label: 'طراحی منوی' },
    { value: 'cafe_setup_services', label: 'راه اندازی' },
    { value: 'sales_experts', label: 'کارشناس فروش' },
    { value: 'human_resources', label: 'منابع انسانی' },
    { value: 'support', label: 'پشتیبانی' },
    { value: 'disposable_supplies', label: 'مصالح یکبار مصرف' },
    { value: 'repairs', label: 'تعمیرات' },
  ]

  const toggleCategory = (value: string) => {
    setSelectedCategories(prev => 
      prev.includes(value) 
        ? prev.filter(cat => cat !== value)
        : [...prev, value]
    )
    console.log(selectedCategories);
    
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch("/api/sendwholesalerdata", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, nationalId, selectedCategories }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    console.log('this is data', data);
    
    if (data.success) {
      router.push("/dashboard")
    } else {
      toast.toast({
        title:'خطا',
        description: data.message,
        variant: 'default',
        className: 'bg-red-500 text-white'
      })
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4A2C2A] via-[#2E1810] to-[#1A0F0A] relative overflow-hidden">
      {/* Coffee beans floating animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="coffee-beans"></div>
      </div>
      
      {/* Overlay with slight blur */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
      
      {/* Content */}
      <div className="relative flex justify-center items-center min-h-screen w-full p-4">
        <div className="relative z-10 w-full max-w-3xl">
          <div className='flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#2C1810]/90 to-[#4A2C2A]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-3xl border border-white/10'>
            <h1 className='absolute top-2 right-2 cursor-pointer text-white/80 hover:text-white transition-colors duration-300' onClick={() => router.replace('/')}>بستن</h1>
            <Image src="/img/logo/logo.webp" width={150} height={150} alt="logo" className="drop-shadow-lg mb-6" />
            <h1 className='text-2xl md:text-3xl font-bold mb-8 text-white'>احرازهویت اولیه عمده فروشان</h1>
            
            <form className='w-full max-w-2xl space-y-6' onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* First Name */}
                <div>
                  <label htmlFor="fname" className='block text-sm font-medium text-white/90 mb-2'>
                    نام :
                  </label>
                  <input 
                    type="text" 
                    id="fname" 
                    name="fname" 
                    required
                    className='w-full px-4 py-2 rounded-3xl bg-white/10 border-2 border-white/20 outline-none text-white placeholder-white/50 focus:border-white/40 transition-colors' 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                {/* Last Name */}
                <div className='form-group'>
                  <label htmlFor="lname" className='block text-sm font-medium text-white/90 mb-2'>
                    نام خانوادگی :
                  </label>
                  <input 
                    type="text" 
                    id="lname" 
                    name="lname" 
                    required
                    className='w-full px-4 py-2 rounded-3xl bg-white/10 border-2 border-white/20 outline-none text-white placeholder-white/50 focus:border-white/40 transition-colors' 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                {/* National ID */}
                <div className='form-group'>
                  <label htmlFor="nationalId" className='block text-sm font-medium text-white/90 mb-2'>
                    کد ملی :
                  </label>
                  <input 
                    type="text" 
                    id="nationalId" 
                    name="nationalId" 
                    required
                    className='w-full px-4 py-2 rounded-3xl bg-white/10 border-2 border-white/20 outline-none text-white placeholder-white/50 focus:border-white/40 transition-colors' 
                    dir="ltr"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                  />
                </div>

                {/* Categories */}
                <div className='form-group'>
                  <label className='block text-sm font-medium text-white/90 mb-2'>
                    دسته بندی :
                  </label>
                  <div className='min-h-[2.5rem] p-3 rounded-3xl bg-white/10 border-2 border-white/20 focus-within:border-white/40 transition-all'>
                    <div className='flex flex-wrap gap-2'>
                      {selectedCategories.map(cat => (
                        <span 
                          key={cat} 
                          className="inline-flex items-center bg-[#8B4513]/20 text-white rounded-full px-3 py-1.5 text-sm hover:bg-[#8B4513]/30 transition-colors"
                        >
                          {categories.find(c => c.value === cat)?.label}
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className="mr-2 hover:bg-[#8B4513]/40 rounded-full p-0.5 transition-colors"
                            aria-label="حذف دسته‌بندی"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </span>
                      ))}
                      <div className="relative flex-1 min-w-[120px]">
                        <select
                          className="w-full appearance-none bg-transparent py-1 pr-2 focus:outline-none text-sm text-white/90 cursor-pointer"
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              toggleCategory(e.target.value)
                              e.target.value = ""
                            }
                          }}
                        >
                          <option value="" className="text-slate-400 bg-[#2C1810]">+ افزودن دسته‌بندی</option>
                          {categories
                            .filter(cat => !selectedCategories.includes(cat.value))
                            .map(cat => (
                              <option key={cat.value} value={cat.value} className="text-white bg-[#2C1810]">
                                {cat.label}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='flex justify-center mt-8'>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-[#8B4513] hover:bg-[#A0522D] transition-colors duration-300 text-white font-semibold rounded-3xl shadow-md warm-glow"
                >
                  ثبت اطلاعات
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FromAuthLevelOne