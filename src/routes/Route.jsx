import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeRoute from './HomeRoute'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import AboutRoute from './aboutRoute.jsx'
import LoginRoute from './Login.jsx'
import RegisterRoute from './register.jsx'
import Downloads from './Downloads.jsx'
import CommunityRoute from './CommunityRoute.jsx'
import ProfileRoute from './ProfileRoute.jsx'
import SupportRoute from './support'
import ContactRoute from './ContactRoute'

export default function AllRoutes() {
    const locations = useLocation()

    return (
        <div className='dark:bg-slate-900'>

            <Sidebar />

            <AnimatePresence exitBeforeEnter initial={false}>
                <Routes location={locations} key={locations.pathname}>
                    <Route path="/" element={<HomeRoute />} />
                    <Route path="/about" element={<AboutRoute />} />
                    <Route path="/register" element={<RegisterRoute />} />
                    <Route path="/login" element={<LoginRoute />} />
                    <Route path="/downloads" element={<Downloads />} />
                    <Route path="/community" element={<CommunityRoute />} />
                    <Route path="/profile" element={<ProfileRoute />} />
                    <Route path="/support" element={<SupportRoute />} />
                    <Route path="/contact" element={<ContactRoute />} />

                </Routes>
            </AnimatePresence>
        </div>
    )
}
