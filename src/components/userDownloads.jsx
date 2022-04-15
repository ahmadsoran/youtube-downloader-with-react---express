import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useGetUserDownloadsQuery } from '../app/api'

import DownloadCards from './downloadCards'
function UserDownloads() {
  const [ShowMenu, setShowMenu] = React.useState(false)
  const [filter, setFilter] = React.useState('newest')
  const { data: userDownloads, refetch } = useGetUserDownloadsQuery()
  const ShowMenuHandler = () => {
    setShowMenu(!ShowMenu)
  }
  useEffect(() => {
    return refetch()
  }, [refetch])
  return (
    <>

      <div className="flex w-full justify-between items-center py-5 px-10  ">
        <div className='flex items-center relative'>

          <h1 className=" text-xl    dark:text-gray-50">Your Downloads</h1>
          <button type="button" className="w-6 h-6 text-base absolute -right-10 rounded-full text-white bg-red-500">
            <span className="p-1">
              {userDownloads && userDownloads?.downloadsData.length}
            </span>
          </button>
        </div>


        <div className="flex flex-col justify-center">
          <FontAwesomeIcon onClick={ShowMenuHandler} icon={faFilter} className="text-xl cursor-pointer hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-500 " />
          <h1 className="text-sm dark:text-gray-500 ">Filter</h1>

          <AnimatePresence>
            {ShowMenu &&

              <motion.div initial={{ opacity: 0, y: -20, scaleY: .3 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -20, scaleY: .3 }} transition={{ duration: .3 }} className="origin-top-right absolute right-3 top-1/4 mt-2 w-fit px-5 py-2 rounded-md shadow-lg bg-slate-50 dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <p onClick={() => {
                    setFilter('oldest')
                    setShowMenu(false)
                  }} className={`text-sm cursor-pointer hover:text-blue-500  dark:hover:text-blue-500 ${filter === 'oldest' ? 'text-blue-500 dark:text-blue-500' : 'dark:text-gray-500'}`}>oldest</p>
                  <p onClick={() => {
                    setFilter('newest')
                    setShowMenu(false)

                  }} className={`text-sm cursor-pointer hover:text-blue-500  dark:hover:text-blue-500 ${filter === 'newest' ? 'text-blue-500 dark:text-blue-500' : 'dark:text-gray-500'}`}>newest</p>
                </div>
              </motion.div>

            }
          </AnimatePresence>

        </div>
      </div>
      <AnimatePresence>
        <div className="px-5 grid place-items-center">


          {userDownloads &&
            filter === 'newest' ? userDownloads?.downloadsData?.map((data, i) => {
              return <DownloadCards key={i} imgThumbnail={data?.thumbnail} title={data?.title} videoUrl={data.videoUrl} date={data?.downloadedAt} onClicks={() => alert('unavailable for now ')} />

            }).reverse() : userDownloads?.downloadsData?.map((data, i) => {
              return <DownloadCards key={i} imgThumbnail={data?.thumbnail} title={data?.title} videoUrl={data.videoUrl} date={data?.downloadedAt} onClicks={() => alert('unavailable for now ')} />
            })
          }
        </div>
      </AnimatePresence>



    </>
  )
}

export default UserDownloads