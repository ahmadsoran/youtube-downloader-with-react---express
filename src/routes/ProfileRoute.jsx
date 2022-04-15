import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useGetUserDataQuery } from '../app/api'
import { AnimatePresence, motion } from 'framer-motion';
import UploadForm from '../components/UploadForm';
export default function ProfileRoute() {
    const { data: userFetchedData } = useGetUserDataQuery();
    const [ShowUploadIMage, setShowUploadIMage] = useState(false)
    const tokenExists = useSelector(state => state.tokenSlice.token)
    let isDarkmode = useSelector(state => state.DarkModeSlice.isDarkMode)
    return <>
        {userFetchedData && tokenExists &&
            <motion.main
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: .3 }} className="profile-page">
                <section className="relative block" style={{ height: "500px" }}>
                    <AnimatePresence exitBeforeEnter>

                        {ShowUploadIMage &&
                            <motion.div initial={{ opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .5 }} className="flex w-full h-full z-50 backdrop-blur-md top-0 left-0 fixed justify-center items-center">
                                <UploadForm />
                                <div onClick={() => setShowUploadIMage(!ShowUploadIMage)} className="w-full absolute top-0 left-0 z-0  h-full"></div>
                            </motion.div>
                        }
                    </AnimatePresence>

                    <div
                        className="absolute top-0 w-full   h-full bg-center bg-cover"
                        style={{
                            backgroundImage: isDarkmode === 'dark' ? `url(${require("../assets/img/backProfile.jpeg")}) ` : 'url("https://res.cloudinary.com/ahmacloud/image/upload/v1649935614/ytdl-profile-image/luca-bravo-zAjdgNXsMeg-unsplash_q4jnll.jpg")',
                        }}
                    >



                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>

                </section>
                <section className="relative py-16 bg-gray-300 dark:bg-slate-800 ">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-900 w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">


                                            {
                                                tokenExists && userFetchedData ?
                                                    <img
                                                        alt="user"
                                                        src={userFetchedData.img}
                                                        className="shadow-xl  rounded-full bg-white dark:bg-slate-800 object-cover w-32 h-32 -translate-y-1/2 
    border-4 border-white dark:border-slate-600"

                                                    />
                                                    :
                                                    <img
                                                        alt="user"
                                                        src={require("../assets/img/user.png")}
                                                        className="shadow-xl  rounded-full bg-white dark:bg-slate-800 object-cover w-32 h-32 -translate-y-1/2 
    border-4 border-white dark:border-slate-600"

                                                    />

                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className="text-center -translate-y-1/4 relative">
                                    <span onClick={() => setShowUploadIMage(!ShowUploadIMage)} className="px-2 pb-1  text-xs rounded-full text-indigo-500 border border-indigo-500 cursor-pointer hover:bg-indigo-500 hover:text-white transition-all ">
                                        edit
                                    </span>
                                    <h3 className="text-4xl font-semibold leading-normal text-gray-800 dark:text-slate-300 mb-2">
                                        {tokenExists && userFetchedData && userFetchedData.name}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 text-gray-500 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                                        @{tokenExists && userFetchedData && userFetchedData.username}
                                    </div>
                                    <div className="mb-2 text-gray-700 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                                        {tokenExists && userFetchedData && userFetchedData.role}
                                    </div>
                                    <div className="mb-2 text-gray-700">
                                        <i className="fas fa-university mr-2 text-lg mb-5 text-gray-500"></i>
                                        {tokenExists && userFetchedData && userFetchedData.phone}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </motion.main>
        }
    </>
}
