import { NextOrderType } from "../types"

export default function postAPI(api:string, 
    endpoint:string, 
    companyName:string,
    address:string,
    nip: string|undefined,
    regon:string,
    email: string,
    orderName : string,
    brutto: string,
    orderList:NextOrderType[],
    completed:boolean) {

    fetch(`${api}/${endpoint}`,
    {
        method  : "POST",
        headers: {
            "Content-type" : "application/json"},
            body : JSON.stringify({
                companyName : companyName,
                address : address,
                nip : nip,
                regon : regon,
                email : email,
                orderName : orderName,
                brutto : brutto,
                orderList,
                completed : false
            })
        })
        .then(response => {
            if(!response.ok) {
                return []
            }
            return response.json()
        })
        .then(datas => datas)
    
}

export  function postPositionsToMagazine(name:string) {

    fetch(`"http://localhost:3000/magazine`,
    {
        method  : "POST",
        headers: {
            "Content-type" : "application/json"},
            body : JSON.stringify({
                name: name
            })
        })
        .then(response => {
            if(!response.ok) {
                return []
            }
            return response.json()
        })
        .then(datas => datas)
}
