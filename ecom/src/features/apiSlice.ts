import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
    api : string
}

const initialState: initialStateType = {
  api: "https://dummyjson.com/products/"
}

const apiSlice = createSlice({
    name : 'api',
    initialState,
    reducers : {
        updateApi(state, action: PayloadAction<string>){
            state.api = action.payload
        }
    }
})
export default apiSlice.reducer
export const {updateApi} = apiSlice.actions