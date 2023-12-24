import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

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

type initialStateType = {
    cartItems: allType[],
    isCartWarn : boolean,
    isCartDisabled : boolean
    totalQty : number
    cartTotalPrice : number
}

const initialState: initialStateType = {
  cartItems: JSON.parse(localStorage.getItem('cartItem') ?? '[]'),
  isCartWarn : false,
  isCartDisabled : false,
  totalQty : 0,
  cartTotalPrice : 0
};

export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        getCart(state, action: PayloadAction<allType>){
            const cartItem = state.cartItems.find((item) => item.id === action.payload.id)
            if(cartItem){
                cartItem.itemQty ++
                toast.info(`${action.payload.title} quantity increased`, {position : "bottom-left"})
            }else{
                state.cartItems.push({...action.payload, itemQty : 1})
                toast.success(`${action.payload.title} added to cart`, {position : "bottom-left"})
            }
            localStorage.setItem('cartItem', JSON.stringify(state.cartItems))
        },
        getIncremented(state, action: PayloadAction<allType>){
            const findIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            state.cartItems[findIndex].itemQty ++
            localStorage.setItem('cartItem', JSON.stringify(state.cartItems))
        },
        getDecremented(state, action: PayloadAction<allType>){
            const findIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if(action.payload.itemQty > 1){
                state.cartItems[findIndex].itemQty --
            }else{
                state.isCartWarn = true
                state.isCartDisabled = true
            }
        },
        getIsWarn(state, action: PayloadAction<boolean>){
            state.isCartWarn = action.payload
        },
        getIsDisabled(state, action: PayloadAction<boolean>){
            state.isCartDisabled = action.payload
        },
        getRemoved(state, action: PayloadAction<allType>){
            const filteredRemove = state.cartItems.filter((item: allType) => item.id !== action.payload.id)
            state.cartItems = filteredRemove
            localStorage.setItem('cartItem', JSON.stringify(filteredRemove))
        },
        getTotalQty(state){
            state.totalQty = state.cartItems.reduce((total, item) => total += item.itemQty, 0)
        },
        getTotalPrice(state){
            state.cartTotalPrice = state.cartItems.reduce((total, item) => total += (item.itemQty * item.price),0) 
        }
    }
})
export default cartSlice.reducer
export const {getCart, getIncremented, getDecremented, getIsWarn, getIsDisabled, getRemoved, getTotalQty, getTotalPrice} = cartSlice.actions    