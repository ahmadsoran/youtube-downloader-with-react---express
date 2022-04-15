import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useUserRegisterMutation } from '../app/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
export default function RegisterRoute() {
    const [sendUserData, { isSuccess, isError, error, isLoading }] = useUserRegisterMutation()
    const [inputInfo, setinputInfo] = useState({})
    const [PasswordType, setPasswordType] = useState('password')
    const locations = useNavigate()

    const inputDataHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setinputInfo((prvData) => ({ ...prvData, [name]: value.replaceAll(/\s\s+/g, '') }))

    }



    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            password: inputInfo?.password,
            email: inputInfo?.email,
            username: inputInfo?.userName,
            firstName: inputInfo?.firstName,
            phoneNumber: inputInfo?.phoneNumber,
        };
        sendUserData(userData)


    };

    let usernametErr = isError && error.data.error.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '').includes("username")
    let usernametErrDup = isError && error.data.error.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '').includes("dup key ")
    let emailInputErr = isError && error.data.error.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '').includes('email')
    let passwordInputErr = isError && error.data.error.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '').includes('password')
    let firstnameInputErr = isError && error.data.error.replace(/[&\\#,+()$~%.'"`:*?<>{}]/g, '').includes('firstName')
    let phoneInputErr = isError && error.data.error.replace(/[&\\#,+()$~%.'"`:*?<>{}]/g, '').includes('phoneNumber')
    console.log(isError && error.data);
    useEffect(() => {

        if (isSuccess) {
            return locations('/login')
        }
    }, [isSuccess, locations])
    return (
        <motion.div initial={{ opacity: 0 }}
            exit={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .3 }}
            className='flex flex-col justify-center items-center '
        >

            <div className="flex flex-col my-20 px-4 py-8 bg-slate-50 shadow-xl shadow-slate-300 rounded-lg  dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Create a new account
                </div>
                <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                    Already have an account ?
                    <Link to='/login' className="text-sm text-blue-500 underline hover:text-blue-700">
                        Sign in
                    </Link>
                </span>
                <div className="p-6 mt-8">
                    <form>
                        <div className="flex gap-4 mb-2">
                            <div className=" relative ">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                                    {firstnameInputErr ? error.data.error.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '') : 'First Name'}
                                </label>
                                <input type="text" required onChange={inputDataHandler} className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 ${firstnameInputErr ? 'bg-red-500' : 'bg-white'} text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`} name="firstName" placeholder="First name" />
                            </div>
                            <div className=" relative ">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium whitespace-nowrap  text-gray-700 dark:text-gray-400">
                                    {usernametErr ? error.data.error.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '') : 'Username'}
                                    {usernametErrDup && 'user already exists '}

                                </label>
                                <input type="text" required onChange={inputDataHandler} className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 ${usernametErr ? 'bg-red-500' : 'bg-white'} text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`} name="userName" placeholder="Username" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium whitespace-nowrap  text-gray-700 dark:text-gray-400">
                                    {phoneInputErr ? error.data.error.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '') : 'Phone number OPTIONAL'}

                                </label>
                                <input type="number" onChange={inputDataHandler} className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 ${phoneInputErr ? 'bg-red-500' : 'bg-white'} text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`} name="phoneNumber" placeholder="phone number optional" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium whitespace-nowrap  text-gray-700 dark:text-gray-400">

                                    {emailInputErr ? error.data.error.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '') : 'Email'}

                                </label>
                                <input type="email" required onChange={inputDataHandler} className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 ${emailInputErr ? 'bg-red-500' : 'bg-white'} text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`} name="email" placeholder="email" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium whitespace-nowrap  text-gray-700 dark:text-gray-400">

                                    {passwordInputErr ? error.data.error.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '') : 'Password'}

                                </label>
                                <input type={PasswordType} required onChange={inputDataHandler} className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 ${passwordInputErr ? 'bg-red-500' : 'bg-white'} text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`} name="password" placeholder="Password" />
                                <FontAwesomeIcon icon={faEye} className={`absolute cursor-pointer right-0 hover:text-blue-500 transition-colors top-1/2 mt-1 mr-2 ${PasswordType === 'password' ? 'text-gray-500' : 'text-blue-500'}`} onClick={() => setPasswordType(PasswordType === 'password' ? 'text' : 'password')} />

                            </div>
                        </div>
                        <div className="flex w-full my-4">
                            {isLoading ?

                                <button disabled className="py-2 px-4  bg-purple-600 opacity-70  focus:ring-offset-purple-200 text-white w-full cursor-wait  rounded-lg ">
                                    Loading...
                                </button>
                                :
                                <button type="submit" onClick={handleSubmit} className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Register
                                </button>
                            }


                        </div>
                    </form>

                </div>
            </div>

        </motion.div>
    )
}
