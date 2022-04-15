import React from 'react'

export default function VideoInfo(props) {
    return (

        <div className="overflow-hidden shadow-lg rounded-lg h-90 w-full mx-5 md:w-96 my-5  m-auto">
            <div className="w-full block h-full">
                <img alt="youtube cover" src={props.imgSrc} className="max-h-52 w-full object-cover" />
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-indigo-500 text-md font-medium">
                        Views: {props.views}
                    </p>
                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                        {props.title}
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 max-h-96 overflow-y-auto overflow-x-hidden  font-light text-md">
                        {props.description}
                    </p>
                    <div className="flex items-center mt-4">
                        <div className="block relative">
                            <img alt="profil" src={props.chaneelImgUrl} className="mx-auto object-cover rounded-full h-10 w-10 " />
                        </div>
                        <div className="flex flex-col justify-between ml-4 text-sm">
                            <p className="text-gray-800 dark:text-white">
                                {props.channelName}
                            </p>
                            <p className="text-gray-400 dark:text-gray-300">
                                Subscirbes: {props.subscribers}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
