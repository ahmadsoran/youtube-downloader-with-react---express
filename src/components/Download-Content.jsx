import React, { useEffect, useState } from 'react'
import { useGetUserDataQuery, useGetVideoInfoMutation, useUserDownloadsMutation } from '../app/api'
import VideoInfo from './videoInfo'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import FD from 'js-file-download'
import { removeToken } from '../features/tokenSlice'
import { useDispatch } from 'react-redux'
export default function DownloadContent() {
    const [sendUrl, { data: videoDownload, isError }] = useGetVideoInfoMutation();
    const { error: userDat } = useGetUserDataQuery()
    const [sendDownloadInfo] = useUserDownloadsMutation();
    const [downloadUrl, setdownloadUrl] = useState('')
    const [selectQuality, setSelectQuality] = useState({ value: 0, dataQuality: undefined, vidype: '' })
    const [showQualityMenu, setShowQualityMenu] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [downloadingProgress, setDownloadingProgress] = useState(0)
    const dispatch = useDispatch()
    const inputUrlValueHandler = async (e) => {
        setdownloadUrl(e.target.value)
        setSelectQuality({ value: 0, dataQuality: undefined, vidype: '' })
        setErrMsg('');
        if (e.currentTarget.value.length > 10) {

            await sendUrl({ url: e.currentTarget.value }).unwrap();

        }
    }

    // let bodyContent = { url: downloadUrl, quality: selectQuality.value };
    let bodyContent = `url=${downloadUrl}&quality=${selectQuality.value}`;
    const platform = navigator.platform;
    const isMac = platform.indexOf('Mac') > -1;
    const isIphone = platform.indexOf('iPhone') > -1;
    const isIpad = platform.indexOf('iPad') > -1;


    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    let reqOptions = {
        // url: "http://localhost:5000/download",
        url: "https://ytdl-download.herokuapp.com/download",
        method: "POST",
        data: bodyContent,
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {

            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            setDownloadingProgress(percentCompleted)
        },
    }
    // Options are optional. You can pass an array of options, too.

    const downloadVideoHandler = () => {
        setIsDownloading(true)

        axios.request(reqOptions).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                FD(res.data, `${videoDownload && videoDownload?.videoTitle + selectQuality.dataQuality}${selectQuality.vidype}`)
                setDownloadingProgress(100)
            }


        }).then(() => {
            sendDownloadInfo({ videoUrl: downloadUrl, thumbnail: videoDownload && videoDownload?.videoThumbnail[0].url, title: videoDownload && videoDownload?.videoTitle }).unwrap().then(() => {
                setdownloadUrl('')
                setSelectQuality({ value: 0, dataQuality: undefined, vidype: '' })

            });

        }).catch(err => {
            if (err.message === 'Request failed with status code 400') {
                setErrMsg(err.message + '  please make sure the url is correct & quality selected... ,if you already selected its mean we colud not access the video route on youtube some of quality require authorization  please try another quality');

            }
            else {
                setErrMsg(err.message);
            }
            return err.meesage

        })



    }
    const downloadVideoQualityHandler = (e) => {
        setSelectQuality({ value: e.target.value, dataQuality: e.target.dataset.quality, vidype: e.target.dataset.vidype })
        setShowQualityMenu(!showQualityMenu)
        setErrMsg('')

    }
    const showMenuHandler = () => {
        setShowQualityMenu(!showQualityMenu)
    }


    useEffect(() => {
        if (errMsg !== '') {
            setIsDownloading(false);


        }
        if (downloadingProgress >= 100) {
            const timeOuts = setTimeout(() => {
                setIsDownloading(false);
            }, 3500);

            return () => {
                clearTimeout(timeOuts)
            }
        }


    }, [downloadingProgress, errMsg])
    useEffect(() => {
        if (userDat?.data?.error && userDat?.data?.error === 'user id not found') {
            dispatch(removeToken('token'))
            window.location.reload()

        }
    }, [userDat?.data?.error]) // eslint-disable-line react-hooks/exhaustive-deps

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
                                <div className={`origin-top-right ${showQualityMenu ? '' : 'hidden'} absolute max-h-96 z-10 overflow-auto right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5`}>
                                    <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        {videoDownload && videoDownload?.videoQuality.map((quality, index) => {
                                            return (
                                                <button key={index} value={quality.itag} onClick={downloadVideoQualityHandler}

                                                    data-quality={quality?.qualityLabel ? quality?.qualityLabel : 'mp3'}
                                                    data-vidype={
                                                        isMac || isIphone || isIpad ?
                                                            quality.audioQuality ?
                                                                quality?.qualityLabel ?
                                                                    '.MOV' :
                                                                    '.mp3' :

                                                                '.MOV'


                                                            :
                                                            quality.audioQuality ?
                                                                quality?.qualityLabel ?
                                                                    '.mp4' :
                                                                    '.mp3' :

                                                                '.mp4'
                                                    }

                                                    className=" w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">

                                                    {
                                                        quality.audioQuality ?
                                                            quality?.qualityLabel ?
                                                                `${quality?.qualityLabel} ${quality.audioQuality} ${formatBytes(quality.videoSizes)}` :
                                                                `audio only mp3 ${quality.audioQuality}  ${formatBytes(quality.videoSizes)}` :
                                                            `${quality.qualityLabel} no sound  ${formatBytes(quality.videoSizes)}`


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

                        {isDownloading ?

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <div className="bg-white dark:bg-slate-700 rounded-lg w-72 shadow block p-4 m-auto">
                                    <div>
                                        <span className="text-xs font-light inline-block p-2  uppercase rounded-full text-white  bg-teal-700">
                                            Downloading... be patient
                                        </span>
                                    </div>
                                    <div className="w-full h-4 relative bg-gray-400 rounded-full mt-3">
                                        <div className=" h-full absolute text-center text-xs text-white bg-teal-700 rounded-full shadow-sm shadow-teal-300" style={{ width: `${downloadingProgress}%` }}>
                                            <p>
                                                {downloadingProgress}%
                                            </p>
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
            {errMsg && <p className='text-red-500 text-center'>{errMsg}</p>}
            {isError && <p className='text-red-500 text-center'>no data found </p>}
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
