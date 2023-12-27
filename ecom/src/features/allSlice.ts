import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import { CategoriesData } from '../components/sub/CategoriesData';

interface allType {
  id: number | string;
  thumbnail: string;
  title: string;
  rating: number;
  stock: number;
  price: number;
  images: string[];
  discountPercentage: number;
  itemQty : number
}
type searchOptionsType = {
    title : string
    url : string
}
interface initialStateType {
    all : allType[]
    status : string
    error : string | null
    api : string
    noMatch ?: string
    searchOptions : searchOptionsType[] 
    isNotFound : boolean
}

export const fetchAll = createAsyncThunk('all/fetch', async (_, {getState}) => {
    try {
        const state = getState() as initialStateType
        const res = await axios.get(state.all.api);
        const data = res?.data.products;
        localStorage.setItem("all", JSON.stringify(data));
        return data
    } catch (err) {
        return err instanceof Error ? err.message : "Couldn't fetch data, please retry";
    }
});

const initialState: initialStateType = {
    all : [],
    status : 'idle',
    error : null,
    api : JSON.parse(localStorage.getItem('api') ?? ''),
    noMatch : '',
    searchOptions : [],
    isNotFound : false
}

export const allSlice = createSlice({
    name : 'all',
    initialState,
    reducers : {
        getApi(state){
            state.api = JSON.parse(localStorage.getItem('api') ?? '')
        },
        getFilteredPrice(state, action: PayloadAction<number[]>){
            state.all = state.all.filter((item: allType) => item.price >= action.payload[0] && item.price <= action.payload[1])
        },
        getFilteredSearch(state, action: PayloadAction<allType[]>){
            state.all = action.payload
        },
        getNoMatch(state, action: PayloadAction<string>){
            state.noMatch = action.payload
        },
        getDiscount(state, action: PayloadAction<allType[]>){
            state.all = action.payload
        },
        getSearchOptions(state, action: PayloadAction<string>){
             const pattern = new RegExp(`^${action.payload}`, "i");
             if (action.payload.length > 0) {
               const filteredResult = CategoriesData.filter((item) =>
                 pattern.test(item.title.toLowerCase())
               )
               state.searchOptions = filteredResult
             }else{
                state.searchOptions = [] 
             }
        },
        getIsNotFound(state, action: PayloadAction<boolean>){
            state.isNotFound = action.payload
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
export const {getApi, getFilteredPrice, getFilteredSearch, getNoMatch, getDiscount, getSearchOptions, getIsNotFound} = allSlice.actions
