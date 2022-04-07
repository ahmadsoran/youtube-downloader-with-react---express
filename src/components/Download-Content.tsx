import React, { useEffect, useState } from 'react'
import { useGetVideoInfoMutation } from '../app/api'
import VideoInfo from './videoInfo'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import FD from 'js-file-download'
export default function DownloadContent() {
    const [sendUrl, { data: videoDownload }] = useGetVideoInfoMutation();
    const [downloadUrl, setdownloadUrl] = useState('')
    const [selectQuality, setSelectQuality] = useState({ value: 0, dataQuality: undefined, vidype: '' })
    const [showQualityMenu, setShowQualityMenu] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [downloadingProgress, setDownloadingProgress] = useState(0)
    const inputUrlValueHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setdownloadUrl(e.target.value)
        setSelectQuality({ value: 0, dataQuality: undefined, vidype: '' })
        setErrMsg('');
        if (e.target.value.length > 10) {

            await sendUrl({ url: e.target.value })

        }
    }
    // let bodyContent = { url: downloadUrl, quality: selectQuality.value };
    let bodyContent = `url=${downloadUrl}&quality=${selectQuality.value}`;
    // let bodyContent = "url=https://www.youtube.com/watch?v=UA7NSpzG98syoutube.co&quality=22";

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
    }



    let reqOptions = {
        url: "http://localhost:5000/download",
        onDownloadProgress: (evt: any) => {
            setDownloadingProgress(Math.round(evt.loaded / evt.total * 100))

        },
        method: "POST",
        headers: headersList,
        data: bodyContent,
        responseType: "blob", // important
    }
    const downloadVideoHandler = () => {
        setDownloadingProgress(2)


        axios.request(reqOptions as object).then(res => {
            FD(res.data, `${videoDownload && videoDownload?.videoTitle + selectQuality.dataQuality}${selectQuality.vidype}`)
        }).then(() => {
            setdownloadUrl('')
            setSelectQuality({ value: 0, dataQuality: undefined, vidype: '' })

        }).catch(err => {
            if (err.message === 'Request failed with status code 400') {
                setErrMsg(err.message + '  please make sure the url is correct & quality selected');

            }
            else {
                setErrMsg(err.message);
            }
            return err.meesage

        })



    }
    const downloadVideoQualityHandler = (e: any) => {
        setSelectQuality({ value: Number(e.target.value), dataQuality: e.target.dataset.quality, vidype: e.target.dataset.vidype })
        setShowQualityMenu(!showQualityMenu)
        setErrMsg('')

    }
    const showMenuHandler = () => {
        setShowQualityMenu(!showQualityMenu)
    }


    useEffect(() => {
        if (downloadingProgress === 100) {
            setTimeout(() => {
                setDownloadingProgress(0);
            }, 3500);
        }
        if (errMsg !== '') {
            setDownloadingProgress(0);

        }


    }, [downloadingProgress, errMsg])

    return (
        <div className='h-100'>
            <div className="dark:bg-slate-900 grid grid-cols-1 grid-rows-12 sm:grid-cols-8 grid-flow-row-dense content-start justify-items-center  w-full  p-5">
                <div className="w-full col-span-6 lg:col-span-7">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-800 dark:text-gray-50">
                        Video URL
                    </label>
                    <div className="mt-1 w-full  relative rounded-md shadow-sm ">

                        <input type="text" minLength={10} onChange={inputUrlValueHandler} value={downloadUrl || ''} name="url" id="url" className={`border-gray-300 py-2 px-4 block w-full pl-7 pr-12 sm:text-sm rounded-md ${errMsg !== '' ? 'bg-red-500' : ''}`} placeholder={errMsg !== '' ? errMsg : 'URL'} />
                        <div className="absolute bg-white inset-y-0 right-0 flex items-center">
                            <label htmlFor="Quality" className="sr-only">
                                Quality
                            </label>


                            <div className="relative inline-block text-left">
                                <div>
                                    <button type="button" onClick={showMenuHandler} className="  bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center w-full   px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none " id="options-menu">
                                        {selectQuality.dataQuality !== undefined ? selectQuality.dataQuality : 'Quality'}
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                                <div className={`origin-top-right ${showQualityMenu ? '' : 'hidden'} absolute max-h-96 overflow-auto right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5`}>
                                    <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        {videoDownload && videoDownload?.videoQuality.map((quality: number | any, index: number) => {
                                            return (
                                                <button key={index} value={quality.itag} onClick={downloadVideoQualityHandler} data-quality={quality?.qualityLabel ? quality?.qualityLabel : 'mp3'} data-vidype={quality.audioQuality ?
                                                    quality?.qualityLabel ?
                                                        '.mp4' :
                                                        '.mp3' :
                                                    '.mp4'} className=" w-full block px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">

                                                    {
                                                        quality.audioQuality ?
                                                            quality?.qualityLabel ?
                                                                quality?.qualityLabel + ' with sound' :
                                                                'audio only mp3' :
                                                            quality.qualityLabel + ' no sound'


                                                    }
                                                </button>

                                            )
                                        })
                                        }



                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className=" w-full  col-span-2 lg:col-span-1 justify-center flex ">
                    <AnimatePresence>

                        {downloadingProgress !== 0 ?

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <div className="bg-white dark:bg-slate-700 rounded-lg w-72 shadow block p-4 m-auto">
                                    <div>
                                        <span className="text-xs font-light inline-block p-2  uppercase rounded-full text-white  bg-teal-700">
                                            Download in progress please be patient
                                        </span>
                                    </div>
                                    <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                        <div className=" h-full text-center text-xs text-white bg-teal-700 rounded-full shadow-md shadow-teal-300" style={{ width: `${downloadingProgress}%` }}>
                                            {downloadingProgress} %
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            :
                            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} type="button" onClick={downloadVideoHandler} className="py-2 px-4  mt-5 mx-4  flex w-fit h-10 justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                                Download
                                <svg width="20" height="20" className="ml-2 rotate-180" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
                                    </path>
                                </svg>
                            </motion.button>
                        }
                    </AnimatePresence>
                </div>

            </div>
            {
                errMsg &&
                <p className='text-red-500 text-center'>{errMsg}</p>
            }
            <AnimatePresence>


                {videoDownload && downloadUrl !== '' &&
                    <motion.div initial={{ opacity: 0, y: 30, scale: .7 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .8 }} transition={{ duration: .3 }} className='flex justify-center '>
                        <VideoInfo
                            imgSrc={videoDownload?.videoThumbnail[0].url}
                            title={videoDownload?.videoTitle}
                            description={videoDownload?.videoDescription}
                            channelName={videoDownload?.videoChannel}
                            views={videoDownload?.videoViewers}
                            chaneelImgUrl={videoDownload?.videoChannelImg}
                            subscribers={videoDownload?.videoChannelSub || 'hidden'}

                        />
                    </motion.div>
                }
            </AnimatePresence>
        </div >
    )
}
