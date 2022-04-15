import React from 'react'
import { motion } from 'framer-motion'
import aboutImage from '../assets/img/pngwing.com.png'
import { Link } from 'react-router-dom'
export default function AboutRoute() {
    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .3 }}>
            <div className="py-16 bg-white dark:bg-slate-900">
                <div className="container m-auto px-6 text-gray-600 dark:text-slate-50 md:px-12 xl:px-6">
                    <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div className="md:5/12 lg:w-5/12 dark:bg-slate-900">
                            <img src={aboutImage} className='dark:bg-slate-900 w-full' alt="yt" />
                        </div>
                        <div className="md:7/12 lg:w-6/12">
                            <h2 className="text-2xl text-gray-900 dark:text-slate-50 font-bold md:text-4xl">YT Downloader is online youtube video downloader service built with react js by <a href='https://ahmadsoran.com' rel="noreferrer" referrerPolicy='no-referrer' target='_blank' className='text-indigo-600 underline'>Ahmad Soran</a></h2>
                            <p className="mt-6 text-gray-600 dark:text-slate-50"> however, our service is hosted on free hosting so do not expect so much from it but it's here for anyone to use it</p>
                            <p className="mt-4 text-gray-600 dark:text-slate-50">and if you liked the project take a visit to the <Link to='/support' className='text-indigo-600 underline'>support</Link> page and follow me on social media</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

    )
}
