// components/dashboard/RecentOrders.tsx
const mockOrders: Array<{ id: number, customer: string, status: string, date: string }> = []

export default function RecentOrders() {
  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4 dark:bg-coffee-dark-bg dark:text-white">
      <h2 className="font-bold text-lg mb-2">سفارش‌های اخیر</h2>
      <ul>
        {mockOrders.length > 0 ? mockOrders.map(order => (
          <li key={order.id} className="flex justify-between py-2 border-b dark:border-white last:border-b-0 dark:text-white">
            <span>{order.customer}</span>
            <span className="text-sm text-gray-500 dark:text-white">{order.status}</span>
            <span className="text-sm text-gray-400 dark:text-white">{order.date}</span>
          </li>
        )) : <div className='flex justify-center items-center h-full'>
          <p>سفارشی وجود ندارد</p>
        </div>}
      </ul>
    </div>
  )
}
