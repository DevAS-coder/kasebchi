// components/dashboard/OverviewCard.tsx
interface OverviewCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  className?: string
}

export default function OverviewCard({ title, value, icon, className }: OverviewCardProps) {
  return (
    <div className={`bg-white dark:bg-coffee-dark-bg dark:text-white shadow rounded-xl p-4 flex items-center gap-4 ${className}`}>
      <div className="text-3xl text-primary dark:text-white">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm dark:text-white">{title}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  )
}
