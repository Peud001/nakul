import {configureStore} from '@reduxjs/toolkit'
import { fetchAll } from '../features/allSlice'
import allReducer from '../features/allSlice'
import cartReducer, { getTotalPrice, getTotalQty } from '../features/cartSlice'

export const store = configureStore({
    reducer : {
        all : allReducer,
        cart : cartReducer
    }
})
store.dispatch(fetchAll())
store.dispatch(getTotalQty())
store.dispatch(getTotalPrice())

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>