import {configureStore} from '@reduxjs/toolkit'
import { fetchAll } from '../features/allSlice'
import allReducer from '../features/allSlice'
import cartReducer from '../features/cartSlice'

export const store = configureStore({
    reducer : {
        all : allReducer,
        cart : cartReducer
    }
})
store.dispatch(fetchAll())

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>