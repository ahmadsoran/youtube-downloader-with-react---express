import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state


// Define the initial state using that type
const initialState = {
    isDarkMode: localStorage.getItem('darkmode')


}

export const DarkModeSlice = createSlice({
    name: 'SetDarkMode',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload
            localStorage.setItem('darkmode', action.payload.toString())
        }
    },
})

export const { setDarkMode } = DarkModeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export default DarkModeSlice.reducer