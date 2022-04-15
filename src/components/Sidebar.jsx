import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import img1 from '../assets/img/user.png'
import { useDispatch, useSelector } from 'react-redux'
import { faContactCard, faDoorOpen, faDownload, faHandshake, faHome, faMoon, faQuestionCircle, faSun, faUser, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from './Navbar'
import { setDarkMode } from '../features/DarkModeSlice'
import { useGetUserDataQuery } from '../app/api'
import borderImage from '../assets/img/clipart721054.png'
import borderImageGif from '../assets/img/supporter.gif'
import VB from '../assets/img/verify.png'
import { removeToken } from '../features/tokenSlice'
export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState(false)
    const [userRole, setUserRole] = useState('')
    const [borderRoleUrl, setBorderRoleUrl] = useState('')
    const { data: userFetchedData, isError, refetch } = useGetUserDataQuery()
    const dispatch = useDispatch()
    const darkmode = useSelector((state) => state.DarkModeSlice.isDarkMode)
    const tokenExists = useSelector(state => state.tokenSlice.token)
    const darkmodeHandler = () => {
        dispatch(setDarkMode('dark'))
    }
    const lightmodeHandler = () => {
        dispatch(setDarkMode('light'))
    }
    useEffect(() => {

        if (userFetchedData && userFetchedData.role === 'admin') {
            setUserRole(true)
            setBorderRoleUrl(borderImage)
        }
        else if (userFetchedData && userFetchedData.role === 'supporter') {
            setUserRole(true)
            setBorderRoleUrl(borderImageGif)

        }

    }, [userFetchedData]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (tokenExists && isError) {
            return refetch()


        }
    }, [tokenExists]) // eslint-disable-line react-hooks/exhaustive-deps
    const removeTokenHandler = () => {
        dispatch(removeToken('token'))
        window.location.reload()
    }

    const locationPath = useLocation().pathname;

    return (
        <aside className='dark:bg-slate-900  bg-slate-50'>
            <Navbar opacity={showSidebar ? 'opacity-0' : 'opacity-100'} onclicks={() => setShowSidebar(!showSidebar)} />

            <div onTouchStart={() => setShowSidebar(!showSidebar)} onClick={() => setShowSidebar(!showSidebar)} className={` backdrop-blur-sm fixed  -z-50 top-0 opacity-0 transition-all left-0 min-w-full min-h-full ${showSidebar ? 'z-40 opacity-100' : ''}`}></div>
            <div className={`fixed  top-0 left-0 touch-none transition-all  ${showSidebar ? 'translate-x-0 z-50' : '-translate-x-full'} bg-slate-50  dark:bg-gray-800 `}>
                <button className='dark:text-white  text-2xl absolute right-4' onClick={() => setShowSidebar(!showSidebar)}>

                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="flex flex-col overflow-auto sm:flex-row sm:justify-around">
                    <div className="w-72 h-screen">
                        <div className="flex items-center justify-start mx-6  mt-10">

                            {tokenExists && userFetchedData ?
                                <Link to='/profile' className="block w-full  relative">
                                    <img alt="profil" style={
                                        userRole ? {
                                            backgroundImage: "url(" + borderRoleUrl + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                        }
                                            : {}

                                    } src={userFetchedData.img} className="mx-auto  p-2 profile-image   hover:scale-105 drop-shadow shadow-slate-500 transition-all  object-cover rounded-full h-20 w-20 " />

                                </Link>
                                :
                                <Link to='/' className="block w-full  relative">

                                    <img alt="profil" src={img1} className="mx-auto hover:outline hover:outline-4 bg-white dark:bg-slate-500 p-3 drop-shadow shadow-slate-500 transition-all hover:outline-red-400 object-cover rounded-full h-20 w-20 " />
                                </Link>

                            }

                        </div>
                        {
                            !userFetchedData ?
                                <div className="flex items-center justify-center mt-3">
                                    <Link to='/login' className='text-xl text-opacity-60 text-gray-800 dark:text-white'>SignIn</Link>
                                    <p className='mx-2 text-md text-opacity-50 dark:text-white text-gray-800'>or</p>
                                    <Link to='/register' className='text-xl text-opacity-60 text-gray-800 dark:text-white'>SignUp</Link>
                                </div>
                                :
                                <div className="flex items-center justify-center mt-3">
                                    <h1 className='text-2xl text-opacity-60 text-gray-800 dark:text-white'>{userFetchedData && userFetchedData.name}</h1>
                                    {userRole &&
                                        <img src={VB} className=' mx-2 w-5 h-5' alt="" />
                                    }
                                </div>}
                        <nav className="mt-10 pb-10 px-6 ">
                            {
                                !userFetchedData ? '' : <>
                                    <Link to='/' className={` hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   rounded-lg ${locationPath === '/' ? 'bg-gray-100 dark:text-white dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400'} `} >
                                        <FontAwesomeIcon icon={faHome} />
                                        <span className="mx-4 text-lg font-normal">
                                            Home
                                        </span>

                                    </Link>
                                    <Link to='/downloads' className={` hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   rounded-lg ${locationPath === '/downloads' ? 'bg-gray-100 dark:text-white dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400'} `} >
                                        <FontAwesomeIcon icon={faDownload} />

                                        <span className="mx-4 text-lg font-normal">
                                            Downloads
                                        </span>
                                        <span className="flex-grow text-right">
                                        </span>
                                    </Link>
                                    <Link to='/community' className={` hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   rounded-lg ${locationPath === '/community' ? 'bg-gray-100 dark:text-white dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400'} `}>
                                        <FontAwesomeIcon icon={faUserGroup} />

                                        <span className="mx-4 text-lg font-normal">
                                            Community
                                        </span>
                                        <span className="flex-grow text-right">
                                        </span>
                                    </Link>
                                    <Link to='/profile' className={` hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   rounded-lg ${locationPath === '/profile' ? 'bg-gray-100 dark:text-white dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400'} `} >
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className="mx-4 text-lg font-normal">
                                            Profile
                                        </span>

                                    </Link>

                                    <Link to='/' onClick={removeTokenHandler} className={` hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   rounded-lg text-red-500 `} >
                                        <FontAwesomeIcon icon={faDoorOpen} />
                                        <span className="mx-4 text-lg font-normal">
                                            logout
                                        </span>

                                    </Link>

                                </>
                            }

                            <Link to='/about' className={` hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   rounded-lg ${locationPath === '/about' ? 'bg-gray-100 dark:text-white dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400'} `} >
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <span className="mx-4 text-lg font-normal">
                                    About
                                </span>

                            </Link>
                            <Link to='/contact' className={` hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   rounded-lg ${locationPath === '/contact' ? 'bg-gray-100 dark:text-white dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400'} `} >
                                <FontAwesomeIcon icon={faContactCard} />
                                <span className="mx-4 text-lg font-normal">
                                    Contact
                                </span>

                            </Link>
                            <Link to='/support' className={` hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   rounded-lg ${locationPath === '/support' ? 'bg-gray-100 dark:text-white dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400'} `} >
                                <FontAwesomeIcon icon={faHandshake} />
                                <span className="mx-4 text-lg font-normal">
                                    Supoort
                                </span>

                            </Link>
                            {
                                darkmode === 'dark' ?
                                    <>
                                        <button onClick={lightmodeHandler} className="hover:text-gray-800 hover:bg-gray-100 w-full flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " >
                                            <FontAwesomeIcon icon={faSun} />
                                            <span className="mx-4 text-lg font-normal">
                                                Light
                                            </span>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button onClick={darkmodeHandler} className="hover:text-gray-800 hover:bg-gray-100 w-full flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " >

                                            <FontAwesomeIcon icon={faMoon} />
                                            <span className="mx-4 text-lg font-normal">
                                                DarkMode
                                            </span>
                                        </button>
                                    </>
                            }
                            <span className="flex-grow text-right">
                            </span>
                        </nav>

                    </div>
                </div>
            </div>

        </aside>
    )
}
