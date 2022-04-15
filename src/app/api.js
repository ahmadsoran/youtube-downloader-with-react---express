// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://ytdl-download.herokuapp.com',
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().tokenSlice.token
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', token)
            }

            return headers
        },
    }),

    endpoints: (builder) => ({
        getVideoInfo: builder.mutation({
            query: (url) => ({
                url: 'getVideoInfo',
                method: "POST",
                body: url
            })

        }),
        userRegister: builder.mutation({
            query: (user) => ({
                url: 'register',
                method: "POST",
                body: user,


            }),
        }),
        userLogin: builder.mutation({
            query: (user) => ({
                url: 'login',
                method: "POST",
                body: user,
            }),
        }),
        getUserData: builder.query({
            query: () => ({
                url: 'getUserData', credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }),
        }),

        userDownloads: builder.mutation({
            query: (downloads) => ({
                url: 'downloads',
                method: "POST",
                body: downloads,
            }),
        }),
        getUserDownloads: builder.query({
            query: () => ({
                url: 'downloadsData',
                method: "GET",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }),
        }),
        getAllUserDownloads: builder.query({
            query: () => ({
                url: 'alluserdownload',
                method: "GET",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }),
        }),
        UploadImageUsers: builder.mutation({
            query: (image) => ({
                url: 'uploadImage',
                method: "POST",
                body: image,
            }),
        }),
        SendBugReport: builder.mutation({
            query: (bug) => ({
                url: 'bugreport',
                method: "POST",
                body: bug,
            }),
        }),



    })
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
    useGetVideoInfoMutation,
    useUserRegisterMutation,
    useUserLoginMutation,
    useGetUserDataQuery,
    useUserDownloadsMutation,
    useGetUserDownloadsQuery,
    useGetAllUserDownloadsQuery,
    useUploadImageUsersMutation,
    useSendBugReportMutation,
} = appApi