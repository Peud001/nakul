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
    cartItems: allType[]
}

const initialState: initialStateType = {
  cartItems: JSON.parse(localStorage.getItem('cartItem') ?? '[]'),
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
        }
    }
})
export default cartSlice.reducer
export const {getCart} = cartSlice.actions    