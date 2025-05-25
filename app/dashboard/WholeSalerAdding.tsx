"use client"
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Stepone from './Signinup/Stepone'
import Steptwo from './Signinup/Steptwo'
import { useUsers } from '@/contexts/UserContext'

function WholeSalerAdding({ auth, setAuth }: any) {
    const [SigninState, setSigninState] = useState<number>(0)
    const { users, setUsers } = useUsers()

    const variants = {
        initial: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute',
        }),
        animate: {
            x: 0,
            opacity: 1,
            position: 'relative',
            transition: { duration: 0.4 },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute',
            transition: { duration: 0.4 },
        }),
    }

    return (
        <div className="max-w-md w-full md:w-[550px] mx-auto p-6 bg-gray-100 shadow-lg rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
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
    )

}

export default WholeSalerAdding
