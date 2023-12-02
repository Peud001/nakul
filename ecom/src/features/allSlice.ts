import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'https://dummyjson.com/products/'

export const fetchAll = createAsyncThunk('all/fetch', async() => {
    try{
        const res = await axios.get(API)
        localStorage.setItem('all', JSON.stringify(res.data.products))
        return res?.data.products
    }
    catch(err){
        return err instanceof Error? err.message : "Couldn't fetch data, please retry"
    }
})

interface initialStateType {
    all : []
    status : string
    error : string | null
}

const initialState: initialStateType = {
    all : [],
    status : 'idle',
    error : null 
}

export const allSlice = createSlice({
    name : 'all',
    initialState,
    reducers : {},
    extraReducers(builder){
        builder
        .addCase(fetchAll.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchAll.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.all = action.payload
        })
        .addCase(fetchAll.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error? (action.error instanceof Error? action.error.message : "Couldn't fetch data, please retry") : "Couldn't fetch data, please retry"
        })
    }
})
export default allSlice.reducer
