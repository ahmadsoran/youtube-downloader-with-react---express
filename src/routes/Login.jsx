import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useUserLoginMutation } from '../app/api'
import { setToken } from '../features/tokenSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function LoginRoute() {
    const [loginToAccount, { data: loginData, isError }] = useUserLoginMutation();
    const [inputInfo, setinputInfo] = useState({})
    const locations = useNavigate()
    const tokenExists = useSelector(state => state.tokenSlice.token)
    const dispatch = useDispatch()


    const inputDataHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setinputInfo((prvData) => ({ ...prvData, [name]: value.replaceAll(/\s\s+/g, '') }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            password: inputInfo?.password,
            username: inputInfo?.userName,

        };
        loginToAccount(userData)
    };
    useEffect(() => {
        if (loginData) {
            dispatch(setToken(loginData))
            locations('/')
        }
        if (tokenExists) {
            locations('/')
        }
    }, [loginData]) // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <motion.div initial={{ opacity: 0, y: -100 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
            className='flex flex-col justify-center items-center '
        >

            <div className="flex flex-col my-20 px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Login
                </div>
                <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                    don't have an account ? &nbsp;
                    <Link to='/register' className="text-sm text-blue-500 underline hover:text-blue-700">
                        Sign Up here
                    </Link>
                </span>
                <div className="p-6 mt-8">
                    <form onSubmit={handleSubmit}>

                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium whitespace-nowrap  text-gray-700 dark:text-gray-400">
                                    Username
                                </label>
                                <input type="text" required onChange={inputDataHandler} className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 ${isError ? 'bg-red-500' : 'bg-white'} text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`} name="userName" placeholder="Username" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium whitespace-nowrap  text-gray-700 dark:text-gray-400">
                                    Password
                                </label>
                                <input type="password" required onChange={inputDataHandler} className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 ${isError ? 'bg-red-500' : 'bg-white'} text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`} name="password" placeholder="Password" />
                            </div>
                        </div>
                        <p className="text-md text-red-500">{isError && 'password or username incorrect'}</p>
                        <div className="flex w-full my-4">
                            <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Login
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </motion.div>
    )
}
