import {configureStore} from '@reduxjs/toolkit'
import { fetchAll } from '../features/allSlice'
import allReducer from '../features/allSlice'
import cartReducer, { getTotalPrice, getTotalQty } from '../features/cartSlice'
import apiReducer from '../features/apiSlice'

export const store = configureStore({
    reducer : {
        all : allReducer,
        cart : cartReducer,
        api : apiReducer
    }
})
store.dispatch(fetchAll())
store.dispatch(getTotalQty())
store.dispatch(getTotalPrice())

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>