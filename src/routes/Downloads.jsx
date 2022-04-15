import React from 'react'
import UserDownloads from '../components/userDownloads'
import { motion } from 'framer-motion'

function Downloads() {
  return (
    <motion.div   
        initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: .3 }} className=" py-5 grid place-items-center w-full">
        <UserDownloads />
    </motion.div>
  )
}

export default Downloads