'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 80,
  minimum: 0.1,
})

export default function TopLoader() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()

    // کمی تأخیر برای طبیعی‌تر شدن (اختیاری)
    const timeout = setTimeout(() => {
      NProgress.done()
    }, 500)

    return () => {
      clearTimeout(timeout)
      NProgress.done()
    }
  }, [pathname])

  return null
}
