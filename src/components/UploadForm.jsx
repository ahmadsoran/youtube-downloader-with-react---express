import React, { useState } from 'react'
import { useUploadImageUsersMutation } from '../app/api'
import Spiner from './spiner'

export default function UploadForm() {
    const [sendImgToServer, { isError, isLoading, isSuccess, error }] = useUploadImageUsersMutation()
    const [Img, setImg] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const handleChangeImage = e => {
        const imgUrl = URL.createObjectURL(e.target.files[0])
        setImg(imgUrl)
        setSelectedFile(e.target.files[0])
    }
    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('uploadImage', selectedFile)
        sendImgToServer(formData)
    }
    if (isSuccess) {
        return window.location.reload()
    }
    return (
        <form className="mt-8 space-y-3 -translate-y-10 z-10 bg-slate-50  mx-5 w-50  dark:bg-slate-800 px-5 py-2 rounded-lg">

            <div className="grid grid-cols-1 space-y-2">
                {Img ? <img className='w-full max-w-sm max-h-96 rounded-md' src={Img} alt="user" /> : <>
                    <label className="text-sm font-bold text-gray-500 tracking-wide">Upload Profile Image</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                            <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <div className="flex flex-auto max-h-48  justify-center w-full h-1/2  -mt-10">
                                    <img className="has-mask w-full max-w-fit h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="nature" />
                                </div>
                                <p className="pointer-none  bg-white p-3 rounded  text-xs sm:text-lg text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <span className="text-blue-600 w-full hover:underline">select a file</span> from your computer</p>
                            </div>
                            <input onChange={handleChangeImage} type="file" accept='image/jpg , image/jpeg , image/png , image/HEIC , image/AVIF , image/pjpeg , image/webp' className="hidden" />
                        </label>
                    </div>
                </>
                }
            </div>
            <p className="text-sm flex justify-between text-gray-300">
                <span>File type: png. jpg...,types of images</span>
                {Img &&
                    <span onClick={() => setImg('')} className="px-2 pb-1  text-xs rounded-full text-indigo-500 border border-indigo-500 cursor-pointer hover:bg-indigo-500 hover:text-white transition-all " >Change Image</span>
                }

            </p>
            <div>
                {isLoading ?
                    <div className="flex w-full justify-center">
                        <Spiner />
                    </div>
                    :
                    <button type="submit" onClick={handleSubmit} className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Upload
                    </button>
                }
                {isError && <p className="text-red-500 text-center text-sm">{error?.data?.error}</p>}
            </div>
        </form>)
}
