import React from 'react'
import { motion } from 'framer-motion'
import Community from '../components/Community.jsx'
export default function CommunityRoute() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .3 }} className=" py-5 grid place-items-center w-full">
            <Community />
        </motion.div>
    )
}
