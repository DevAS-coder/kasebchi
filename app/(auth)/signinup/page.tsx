"use client"
import { WholeSalerProvider } from '@/contexts/WholeSalerInfo'
import React, { useEffect, useState } from 'react'
import WholeSalerAdding from '@/app/(dashboard)/dashboard/WholeSalerAdding'
import { useRouter } from 'next/navigation'

function Signinup() {
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

  // Helper function to set auth in localStorage (can be used elsewhere in the app)
  // const setAuth = (isAuth: boolean, userData = {}) => {
  //   const authData = {
  //     isAuthenticated: isAuth,
  //     userData,
  //     timestamp: new Date().getTime()
  //   }
  //   localStorage.setItem('auth', JSON.stringify(authData))
  //   setIsAuthenticated(isAuth)
  // }

  // const logout = () => {
  //   localStorage.removeItem('auth')
  //   setIsAuthenticated(false)
  // }

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
        <div className="flex justify-center items-center h-screen w-full ">
          <div>
            <WholeSalerAdding auth={isAuthenticated} setAuth={setIsAuthenticated}/>
          </div>
        </div>
      ) : null}
    </WholeSalerProvider>
  )
}

export default Signinup