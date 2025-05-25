import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'

const data = [
  { name: "فروردین", فروش: 120 },
  { name: "اردیبهشت", فروش: 98 },
  { name: "خرداد", فروش: 160 },
]

export default function SalesChart() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkClass = () =>
      document.documentElement.classList.contains('dark')

    const observer = new MutationObserver(() => {
      setIsDark(checkDarkClass())
    })

    setIsDark(checkDarkClass()) // بار اول

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-white dark:bg-coffee-dark-bg p-4 rounded-xl shadow mt-4 text-gray-900 dark:text-white">
      <h2 className="font-bold text-lg mb-2">نمودار فروش</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            tick={{ fill: isDark ? '#fff' : '#333' }}
            axisLine={{ stroke: isDark ? '#aaa' : '#ccc' }}
            tickLine={{ stroke: isDark ? '#aaa' : '#ccc' }}
          />
          <YAxis
            tick={{ fill: isDark ? '#fff' : '#333' }}
            axisLine={{ stroke: isDark ? '#aaa' : '#ccc' }}
            tickLine={{ stroke: isDark ? '#aaa' : '#ccc' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f1f1f' : '#fff',
              borderColor: isDark ? '#444' : '#ccc',
              color: isDark ? '#fff' : '#000',
            }}
            labelStyle={{ color: isDark ? '#eee' : '#333' }}
            itemStyle={{ color: isDark ? '#fff' : '#000' }}
          />
          <Line
            type="monotone"
            dataKey="فروش"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ stroke: '#0ea5e9', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
