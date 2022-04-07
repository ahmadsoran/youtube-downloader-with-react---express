import React from 'react'
import DownloadContent from '../components/Download-Content'
import { motion } from 'framer-motion'
export default function HomeRoute() {
    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .3 }}>
            <DownloadContent />
        </motion.div>


    )
}
