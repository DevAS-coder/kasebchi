"use client"
import { WholeSalerProvider } from '@/contexts/WholeSalerInfo'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Login from '@/app/(auth)/login/Login'

function login() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    document.title = 'کاسب‌چی | ورود و ثبت نام'

    const authData = localStorage.getItem('auth')

    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData)
        if (parsedAuth && parsedAuth.isAuthenticated) {
          setIsAuthenticated(true)
          router.replace('/dashboard')
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Failed to parse auth data:", error)
        setIsAuthenticated(false)
        localStorage.removeItem('auth')
      }
    } else {
      setIsAuthenticated(false)
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-primary">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <WholeSalerProvider>
      {!isAuthenticated ? (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#4A2C2A] via-[#2E1810] to-[#1A0F0A] relative overflow-hidden">
          {/* Coffee beans floating animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="coffee-beans"></div>
          </div>
          
          {/* Overlay with slight blur */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
          
          {/* Content */}
          <div className="relative flex justify-center items-center min-h-screen w-full p-4">
            <div className="relative z-10">
              <Login/>
            </div>
          </div>
        </div>
      ) : null}
    </WholeSalerProvider>
  )
}

export default login