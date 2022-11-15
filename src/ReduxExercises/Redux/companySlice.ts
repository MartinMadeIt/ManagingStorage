import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {postAPI} from "../Controllers/postAPI"

interface CompanyType {
    name: string,
    nip:string,
    regon:string,
    local: string,
    postalCode: string,
    city: string,
    email: string
}

const initialState: CompanyType = {
    name: "Factory nmb 1",
    nip: "1234556789",
    regon: "112345678",
    local: "Mostowa 12",
    postalCode: "12-342",
    city:"Warsaw",
    email:"example@exam.pl"
}

export const companySlice = createSlice({
    name : "companyInfo",
    initialState,
    reducers : {
        // jak to skrócić ?
        changeInfo: (state,action:PayloadAction<CompanyType>) => {
           return {name: action.payload.name, nip: action.payload.nip, regon: action.payload.regon, local: action.payload.local, postalCode: action.payload.postalCode,
                    city: action.payload.city, email: action.payload.email}
        }
    }
})

export const {changeInfo} = companySlice.actions;