"use client"
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Stepone from '@/app/(auth)/login/Stepone'
import Steptwo from '@/app/(auth)/login/Steptwo'

function Login() {
    const [SigninState, setSigninState] = useState<number>(0)

    const variants = {
        initial: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
            position: 'absolute' as const,
        }),
        animate: {
            x: 0,
            opacity: 1,
            scale: 1,
            position: 'relative' as const,
            transition: { 
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
            },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
            position: 'absolute' as const,
            transition: { duration: 0.4 },
        }),
    }

    return (
        <div className="relative">

            <div className="max-w-md w-full md:w-[550px] mx-auto p-8 bg-gradient-to-b from-[#2C1810]/90 to-[#4A2C2A]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-3xl flex flex-col items-center justify-center relative overflow-hidden border border-white/10">
                {/* Background coffee bean pattern */}
                <div className="absolute inset-0 opacity-5 pattern-coffee-beans"></div>
                
                <AnimatePresence initial={false} custom={SigninState}>
                    {SigninState === 0 && (
                        <motion.div
                            key="stepone"
                            custom={1}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full max-w-md absolute top-0 left-0"
                        >
                            <Stepone setSigninState={setSigninState} />
                        </motion.div>
                    )}

                    {SigninState === 1 && (
                        <motion.div
                            key="steptwo"
                            custom={-1}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full max-w-md absolute top-0 left-0"
                        >
                            <Steptwo setSigninState={setSigninState} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Login
