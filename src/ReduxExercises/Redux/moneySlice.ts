import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface intialType {
    accountBallance:number
}


interface MoneyState {
    value: number
}

const initialState:MoneyState = {
    value: 0
}

export const moneySlice = createSlice({
    name : "money",
    initialState,
    reducers: {
        withdraw : (state, action:PayloadAction<number>) => {
            if(state.value >= action.payload && action.payload > 0) {
                state.value -= action.payload
            } else {
                console.log("Insufficient account ballance"); 
            }
        },
        deposit: (state, action:PayloadAction<number>) => {
            if(action.payload > 0) {
                state.value += action.payload
            }
        }
    }
})

export const { withdraw, deposit } = moneySlice.actions;
