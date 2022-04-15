import React, { useEffect, useState } from 'react'
import { useGetAllUserDownloadsQuery } from '../app/api'
import adminBorder from '../assets/img/clipart721054.png'
import supportBorder from '../assets/img/supporter.gif'
import moment from 'moment'

export default function Community() {
    const { data: user, refetch } = useGetAllUserDownloadsQuery()
    const [searchText, setSearchText] = useState('')
    useEffect(() => {
        refetch()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    const inputchange = (e) => {
        setSearchText(e.target.value)
    }
    return <>
        {
            user &&

            <div className="w-full  p-12">
                <div className="header grid grid-cols-1 md:grid-cols-2 mb-12">
                    <div className="title md:text-left text-center">
                        <p className="text-4xl  font-bold text-gray-800 dark:text-slate-50 mb-4">
                            Lastest Downloads
                        </p>
                        <p className="text-2xl font-light text-gray-400">
                            All Downloads by other users will be here
                        </p>
                    </div>
                    <div className="text-end md:py-0 py-4">
                        <form className="flex flex-col md:flex-row w-full md:space-x-3 space-y-3 md:space-y-0 justify-end">
                            <div className=" relative ">
                                <input type="text" onChange={inputchange} value={searchText || ''} id="&quot;form-subscribe-Search" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter a title" />
                            </div>

                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12">
                    {user && user?.downloads?.filter((element) => {

                        return element?.title?.toLowerCase()?.includes(searchText?.toLowerCase())


                    }).map((user, i) => {

                        return (

                            <div key={i} className="flex flex-col sm:flex-row justify-between mx-4 md:mx-0 lg:-mx-2 flex-wrap">
                                <div className="rounded overflow-hidden shadow-lg flex-1 bg-slate-50 dark:bg-slate-800 sm:mx-2 md:mx-1 lg:mx-2 w-full sm:w-1/3 lg:pt-0 border-b-4 border-blue-500 mb-10 flex flex-col">
                                    <img src={user.thumbnail} alt="People" className="w-full object-cover h-32 sm:h-48 " />
                                    <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800 flex flex-col justify-between flex-1">
                                        <div>

                                            <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">  {user.videoUrl}</p>
                                            <h3 className="font-semibold mb-2 text-xl leading-tight text-gray-800 dark:text-white sm:leading-normal">{user.title}</h3>
                                        </div>
                                        <div className="text-sm flex justify-between mt-5  items-end">
                                            <div className="flex">

                                                <img style={
                                                    user?.userRole === 'admin' ? {
                                                        backgroundImage: "url(" + adminBorder + ")",
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'contain',
                                                        backgroundRepeat: 'no-repeat',
                                                    }
                                                        :
                                                        user?.userRole === 'supporter' ? {
                                                            backgroundImage: "url(" + supportBorder + ")",
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'contain',
                                                            backgroundRepeat: 'no-repeat',
                                                        }
                                                            :
                                                            {}} alt="profil" src={user.userImage} className="mx-auto p-1 object-cover rounded-full h-10 w-10 " />

                                                <div className="flex flex-col  ml-4 text-sm">
                                                    <p className="text-gray-800 dark:text-white">
                                                        {user.nameOfUser}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300 opacity-50">
                                                        {user.userRole}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className=" text-gray-600 dark:text-gray-300 opacity-30">{moment(user.downloadedAt).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        )

                    }).reverse()
                    }
                </div>

            </div>
        }
    </>



}
