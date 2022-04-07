import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
interface NavbarProps {
    onclicks: () => void,
    opacity: string
}
export default function Navbar(props: NavbarProps) {
    return (
        <div className={`dark:bg-gray-800 w-full transition-all ${props.opacity}`}>
            <div className="flex justify-between items-center py-3 px-5 w-full">
                <div className="flex w-full md:justify-start justify-between items-center" >
                    <button className='text-gray-900 mr-0 md:mr-3 text-2xl rounded-full bg-slate-400 bg-opacity-25 w-10 h-10 hover:bg-opacity-100 hover:text-white transition-all' onClick={props.onclicks}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <h1 className='text-3xl dark:text-white text-gray-900 bg-red-100 dark:bg-slate-900 rounded-full p-3'>YT <span className='text-red-600'>Download</span></h1>
                </div>
                <div className="ml-10 hidden items-baseline space-x-4 md:flex">
                    <Link to='/' className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                        Home
                    </Link>
                    <Link to='/about' className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2  rounded-md text-sm font-medium" >
                        About
                    </Link>
                    <Link to='/support' className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                        Support
                    </Link>
                    <Link to='/' className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                        Contact
                    </Link>
                </div>

            </div>
        </div>
    )
}
