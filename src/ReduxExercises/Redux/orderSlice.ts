import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {postAPI} from "../Controllers/postAPI"

interface OrderState {
    id: number,
    companyName: string, street:string, 
    localNumber:string, city:string, 
    postalCode:string, email:string,
    orderName:string, brutto:string,
    completed:boolean
}

const initialState: OrderState[] = []

export const orderSlice = createSlice({
    name : "order",
    initialState,
    reducers : {
        // jak to skrócić ?
        addOrder: (state,action:PayloadAction<OrderState>) => {
           return [...state,{id: action.payload.id, companyName: action.payload.companyName, street: action.payload.street, 
            localNumber: action.payload.localNumber, city: action.payload.city, postalCode: action.payload.postalCode,
            email: action.payload.email, orderName: action.payload.orderName, brutto: action.payload.brutto, completed: action.payload.completed}]
        },
        removeOrder : (state, action:PayloadAction<{id:number}>) => {
            return state.filter(el => el.id !== action.payload.id)
        }
    }
})

export const {addOrder, removeOrder} = orderSlice.actions;