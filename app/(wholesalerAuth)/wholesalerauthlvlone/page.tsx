"use client"
import React, { useState } from 'react'
import { X } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

function FromAuthLevelOne() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [firstName, setFirstName] = useState<string>("")
  // const [Category, setCategory] = useState<string>("")
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
    { value: 'disposable', label: 'مصالح یکبار مصرف' },
    { value: 'repairs', label: 'تعمیرات' },
  ]

  const toggleCategory = (value: string) => {
    setSelectedCategories(prev => 
      prev.includes(value) 
        ? prev.filter(cat => cat !== value)
        : [...prev, value]
    )
    
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
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-3xl mx-auto border-4 rounded-2xl border-slate-500 min-h-[24rem] flex flex-col justify-start items-center p-6 md:p-10 bg-white shadow-lg'>
        <h1 className='text-2xl md:text-3xl font-bold mb-8 text-slate-800'>احرازهویت اولیه عمده فروشان</h1>
        
        <form className='w-full max-w-2xl space-y-6' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* First Name */}
            <div>
              <label htmlFor="fname" className='block text-sm font-medium text-slate-700 mb-2'>
                نام :
              </label>
              <input 
                type="text" 
                id="fname" 
                name="fname" 
                required
                className='w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors' 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className='form-group'>
              <label htmlFor="lname" className='block text-sm font-medium text-slate-700 mb-2'>
                نام خانوادگی :
              </label>
              <input 
                type="text" 
                id="lname" 
                name="lname" 
                required
                className='w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors' 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* National ID */}
            <div className='form-group'>
              <label htmlFor="nationalId" className='block text-sm font-medium text-slate-700 mb-2'>
                کد ملی :
              </label>
              <input 
                type="text" 
                id="nationalId" 
                name="nationalId" 
                required
                className='w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors' 
                dir="ltr"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
              />
            </div>

            {/* <div className='form-group'>
              <label htmlFor="Category" className='block text-sm font-medium text-slate-700 mb-2'>
                دسته بندی :
              </label>
              <input 
                type="text" 
                id="Category" 
                name="Category" 
                required
                className='w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors' 
                dir="ltr"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div> */}

            {/* Categories */}
            <div className='form-group'>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                دسته بندی :
              </label>
              <div className='min-h-[2.5rem] p-3 border border-slate-300 rounded-lg focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all'>
                <div className='flex flex-wrap gap-2'>
                  {selectedCategories.map(cat => (
                    <span 
                      key={cat} 
                      className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm hover:bg-primary/20 transition-colors"
                    >
                      {categories.find(c => c.value === cat)?.label}
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className="mr-2 hover:bg-primary/30 rounded-full p-0.5 transition-colors"
                        aria-label="حذف دسته‌بندی"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                  <div className="relative flex-1 min-w-[120px]">
                    <select
                      className="w-full appearance-none bg-transparent py-1 pr-2 focus:outline-none text-sm text-slate-600 cursor-pointer"
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          toggleCategory(e.target.value)
                          e.target.value = ""
                        }
                      }}
                    >
                      <option value="" className="text-slate-400">+ افزودن دسته‌بندی</option>
                      {categories
                        .filter(cat => !selectedCategories.includes(cat.value))
                        .map(cat => (
                          <option key={cat.value} value={cat.value} className="text-slate-700">
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
              className='px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2'
            >
              ثبت اطلاعات
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FromAuthLevelOne