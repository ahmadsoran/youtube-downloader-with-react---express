import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
// import HomeRoute from './HomeRoute'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar'
// import AboutRoute from './aboutRoute'
// import LoginRoute from './Login'
// import RegisterRoute from './register'

export default function AllRoutes() {
    const locations = useLocation()

    return (
        <div className='dark:bg-slate-900'>
            kk
            <Sidebar />

            <AnimatePresence exitBeforeEnter initial={false}>
                <Routes location={locations} key={locations.pathname}>
                    {/* <Route path="/" element={<HomeRoute />} />
                    <Route path="/about" element={<AboutRoute />} />
                    <Route path="/register" element={<RegisterRoute />} />
                    <Route path="/login" element={<LoginRoute />} /> */}
                </Routes>
            </AnimatePresence>
        </div>
    )
}
