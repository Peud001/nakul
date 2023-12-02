import {configureStore} from '@reduxjs/toolkit'
import { fetchAll } from '../features/allSlice'
import allReducer from '../features/allSlice'

export const store = configureStore({
    reducer : {
        all : allReducer
    }
})
store.dispatch(fetchAll())

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>