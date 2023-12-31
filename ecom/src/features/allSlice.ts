import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import { CategoriesData } from '../components/sub/CategoriesData';
import { RootState } from '../app/store';

interface allType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [];
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
    noMatch ?: string
    searchOptions : searchOptionsType[] 
    isNotFound : boolean
    isOpened : boolean
}

export const fetchAll = createAsyncThunk(
  "all/fetch",
  async (_, { getState }) => {
    try {
      const currentState = getState() as RootState;
      const currentApi = currentState.api.api; 
      const res = await axios.get(currentApi);
      const data = res?.data.products;
      return data;
    } catch (err) {
      return err instanceof Error
        ? err.message
        : "Couldn't fetch data, please retry";
    }
  }
);

const initialState: initialStateType = {
    all : [],
    status : 'idle',
    error : null,
    noMatch : '',
    searchOptions : [],
    isNotFound : false,
    isOpened : false
}

export const allSlice = createSlice({
    name : 'all',
    initialState,
    reducers : {
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
        },
        getIsOpen(state){
            state.isOpened = !state.isOpened
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
export const { getFilteredPrice, getFilteredSearch, getNoMatch, getDiscount, getSearchOptions, getIsNotFound, getIsOpen} = allSlice.actions
