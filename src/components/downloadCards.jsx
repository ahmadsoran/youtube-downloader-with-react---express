import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useGetUserDownloadsQuery } from '../app/api'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import adminBorder from '../assets/img/clipart721054.png'
import supportBorder from '../assets/img/supporter.gif'
export default function DownloadCards(props) {
  const { data: userDownloads } = useGetUserDownloadsQuery()

  return (
    <div className="w-full lg:w-2/3  bg-slate-50 dark:bg-slate-800 shadow-md rounded-lg my-5 overflow-hidden block   sm:flex-row   dark:shadow-slate-700 sm:flex ">
      <div className="sm:w-1/3 bg-cover bg-landscape">
        <img alt='' src={props.imgThumbnail} className="w-full h-full object-cover object-center" />

      </div>
      <div className=" sm:w-2/3  p-4">
        <h1 className="text-gray-900 dark:text-slate-50 font-bold text-2xl">
          {props.title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-slate-200 text-sm">
          {props.videoUrl}
        </p>

        <div className="flex item-center justify-between mt-3">
          <div className="flex items-center justify-start  mt-10">

            <div className="flex w-full items-center">

              <Link to='/profile' className="block relative">
                <img alt='' style={
                  userDownloads && userDownloads?.userData?.role === 'admin' ? {
                    backgroundImage: "url(" + adminBorder + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                  }
                    :
                    userDownloads && userDownloads?.userData?.role === 'supporter' ? {
                      backgroundImage: "url(" + supportBorder + ")",
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                    }
                      :
                      {}

                } src={userDownloads?.userData?.img} className="mx-auto  p-2 profile-image   hover:scale-105 drop-shadow shadow-slate-500 transition-all  object-cover rounded-full sm:h-20 w-10 h-10 sm:w-20" />

              </Link>
              <h1 className="dark:text-slate-50 text-sm mx-2 sm:text-xl">{userDownloads?.userData?.name}</h1>

            </div>




          </div>

          <div className="flex justify-end items-end ">
            <div className="block text-right">

              <FontAwesomeIcon title='Download' onClick={props.onClicks} icon={faDownload} className="text-xl cursor-pointer  hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-500 " />
              <p className="dark:text-slate-50 text-xs text-opacity-20 opacity-50 ">downloaded: {moment(props.date).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
