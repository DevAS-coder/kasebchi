
import { BarChart3, ShieldCheck, Clock, HeartHandshake } from 'lucide-react'

const BenefitsSection = () => {
  return (
    <section className="mx-auto py-16 bg-white dark:bg-coffee-dark-bg border-b-2 border-primary">
        <h1 className='text-center mb-10 dark:text-white text-4xl font-bold'>چرا کاسب‌چی؟</h1>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center p-6">
          <BarChart3 className="w-12 h-12 mb-4 text-primary dark:text-white" />
          <h3 className="text-lg font-semibold mb-2 dark:text-white">مقایسه قیمت</h3>
          <p className="text-gray-600 dark:text-white">بهترین قیمت‌ها را مقایسه و انتخاب کنید</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-6">
          <ShieldCheck className="w-12 h-12 mb-4 text-primary dark:text-white" />
          <h3 className="text-lg font-semibold mb-2 dark:text-white">بررسی کیفیت</h3>
          <p className="text-gray-600 dark:text-white">تضمین کیفیت محصولات و خدمات</p>
        </div>

        <div className="flex flex-col items-center text-center p-6">
          <Clock className="w-12 h-12 mb-4 text-primary dark:text-white" />
          <h3 className="text-lg font-semibold mb-2 dark:text-white">زمان تحویل</h3>
          <p className="text-gray-600 dark:text-white">تحویل سریع و به موقع سفارشات</p>
        </div>

        <div className="flex flex-col items-center text-center p-6">
          <HeartHandshake className="w-12 h-12 mb-4 text-primary dark:text-white" />
          <h3 className="text-lg font-semibold mb-2 dark:text-white">خدمات پس از فروش</h3>
          <p className="text-gray-600 dark:text-white">پشتیبانی و خدمات مشتریان عالی</p>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
