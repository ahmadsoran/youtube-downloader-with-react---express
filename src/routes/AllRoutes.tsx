import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeRoute from './HomeRoute'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '../components/SideBar'
import AboutRoute from './aboutRoute'

export default function AllRoutes() {
    const locations = useLocation()

    return (
        <div className='dark:bg-slate-900'>
            <Sidebar />

            <AnimatePresence exitBeforeEnter initial={false}>
                <Routes location={locations} key={locations.pathname}>

                    <Route path="/" element={<HomeRoute />} />
                    <Route path="/about" element={<AboutRoute />} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}
