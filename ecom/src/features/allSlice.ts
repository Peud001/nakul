import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


interface initialStateType {
    all : []
    status : string
    error : string | null
    api : string
}

export const fetchAll = createAsyncThunk('all/fetch', async (_, {getState}) => {
    try {
        const state = getState() as initialStateType
        const res = await axios.get(state.all.api);
        return res?.data.products;
    } catch (err) {
        return err instanceof Error ? err.message : "Couldn't fetch data, please retry";
    }
});

const initialState: initialStateType = {
    all : [],
    status : 'idle',
    error : null,
    api : 'https://dummyjson.com/products/' 
}

export const allSlice = createSlice({
    name : 'all',
    initialState,
    reducers : {
        getApi(state, action){
            state.api = action.payload
        }
    },
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
export const {getApi} = allSlice.actions
