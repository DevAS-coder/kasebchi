import { BarChart3, ShieldCheck, Clock, HeartHandshake } from 'lucide-react'

const BenefitsSection = () => {
  return (
    <section className="mx-auto py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-coffee-dark-bg dark:via-coffee-dark-bg/80 dark:to-coffee-dark-bg border-b-2 border-primary">
      <h1 className='text-center mb-14 dark:text-white text-4xl font-extrabold tracking-tight'>چرا کاسب‌چی؟</h1>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col items-center text-center p-8 bg-white/80 dark:bg-coffee-dark-bg/80 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-coffee-dark-bg/40">
          <span className="flex items-center justify-center w-20 h-20 mb-5 rounded-full bg-primary/10 dark:bg-white/10 shadow-md">
            <BarChart3 className="w-10 h-10 text-primary dark:text-white" />
          </span>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">مقایسه قیمت</h3>
          <p className="text-gray-600 dark:text-gray-200">بهترین قیمت‌ها را مقایسه و انتخاب کنید</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-8 bg-white/80 dark:bg-coffee-dark-bg/80 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-coffee-dark-bg/40">
          <span className="flex items-center justify-center w-20 h-20 mb-5 rounded-full bg-primary/10 dark:bg-white/10 shadow-md">
            <ShieldCheck className="w-10 h-10 text-primary dark:text-white" />
          </span>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">بررسی کیفیت</h3>
          <p className="text-gray-600 dark:text-gray-200">تضمین کیفیت محصولات و خدمات</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 bg-white/80 dark:bg-coffee-dark-bg/80 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-coffee-dark-bg/40">
          <span className="flex items-center justify-center w-20 h-20 mb-5 rounded-full bg-primary/10 dark:bg-white/10 shadow-md">
            <Clock className="w-10 h-10 text-primary dark:text-white" />
          </span>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">زمان تحویل</h3>
          <p className="text-gray-600 dark:text-gray-200">تحویل سریع و به موقع سفارشات</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 bg-white/80 dark:bg-coffee-dark-bg/80 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-coffee-dark-bg/40">
          <span className="flex items-center justify-center w-20 h-20 mb-5 rounded-full bg-primary/10 dark:bg-white/10 shadow-md">
            <HeartHandshake className="w-10 h-10 text-primary dark:text-white" />
          </span>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">خدمات پس از فروش</h3>
          <p className="text-gray-600 dark:text-gray-200">پشتیبانی و خدمات مشتریان عالی</p>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
