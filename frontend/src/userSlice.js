import { createSlice } from '@reduxjs/toolkit'

const useSlice = createSlice({
    name: 'user',
    initialState:{
        token:null
    },
    reducers:{
        setToken(state,action) {
            state.token = action.payload
        }
    }
})

export const {setToken} = useSlice.actions

export default useSlice.reducer