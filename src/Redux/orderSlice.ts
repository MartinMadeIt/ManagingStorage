import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {postAPI} from "../Controllers/postAPI"

interface OrderState {
    id: number,
    companyName: string, nip:string, 
    regon:string, address:string, email:string,
    orderName:string, brutto:string,
    completed:boolean
}

const initialState: OrderState[] = []

export const orderSlice = createSlice({
    name : "order",
    initialState,
    reducers : {
        addOrder: (state,action:PayloadAction<OrderState>) => {
           return [...state,{id: action.payload.id, companyName: action.payload.companyName, nip: action.payload.nip, 
            regon: action.payload.regon, address: action.payload.address,email: action.payload.email, 
            orderName: action.payload.orderName, brutto: action.payload.brutto, completed: action.payload.completed}]
        },
        removeOrder : (state, action:PayloadAction<{id:number}>) => {
            return state.filter(el => el.id !== action.payload.id)
        }
    }
})

export const {addOrder, removeOrder} = orderSlice.actions;