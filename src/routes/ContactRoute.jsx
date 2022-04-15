import React, { useEffect, useState } from 'react'
import { useSendBugReportMutation } from '../app/api'
import { motion } from 'framer-motion'
export default function ContactRoute() {
    const [sendBug, { isError, isSuccess }] = useSendBugReportMutation();
    const [InputInfo, setInputInfo] = useState({})
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputInfo({ ...InputInfo, [name]: value });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        sendBug({
            username: InputInfo.username,
            message: InputInfo.message,
        })

    }
    useEffect(() => {
        if (isSuccess) {
            setInputInfo({})
        }
    }, [isSuccess])
    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white"
        >
            <section className="flex w-[30rem] flex-col space-y-10">
                <div className={`text-center text-4xl font-medium ${isSuccess ? "text-teal-700" : ""} ${isError && 'text-red-500'}`} >{isError ? 'make sure username +5 and message +10' : 'Report a Bug'}{isSuccess && '  successfuly'}</div>

                <div
                    className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                >
                    <input
                        type="text"
                        placeholder="Email or Username"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        name='username'
                        value={InputInfo.username || ''}
                        onChange={inputChangeHandler}
                    />
                </div>

                <div
                    className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                >
                    <textarea
                        placeholder="Message"
                        rows={10}
                        name="message"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        onChange={inputChangeHandler}
                        value={InputInfo.message || ''}

                    />
                </div>

                <button
                    onClick={submitHandler}
                    className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
                >
                    Send
                </button>


            </section>
        </motion.main>
    )
}
