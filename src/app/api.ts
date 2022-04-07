// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ytdl-download.herokuapp.com',
        // baseUrl: 'http://localhost:5000',

    }),

    endpoints: (builder) => ({
        getVideoInfo: builder.mutation({
            query: (url) => ({
                url: 'getVideoInfo',
                method: "POST",
                body: url
            })
        }),
    }),



})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetVideoInfoMutation } = appApi