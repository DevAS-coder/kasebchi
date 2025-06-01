"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Login from '@/app/(auth)/login/Login'

function login() {

  useEffect(() => {
    document.title = 'کاسب‌چی | ورود و ثبت نام'

  }, [])



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
            <div className="relative z-10">
              <Login/>
            </div>
          </div>
        </div>
      
  )
}

export default login