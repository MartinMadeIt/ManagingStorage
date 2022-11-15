export default function postAPI(api:string, 
    endpoint:string, 
    companyName:string,
    street:string,
    localNumber: string|undefined,
    city:string,
    postalCode:string,
    email: string,
    orderName : string,
    brutto: string,
    completed:boolean) {

    fetch(`${api}/${endpoint}`,
    {
        method  : "POST",
        headers: {
            "Content-type" : "application/json"},
            body : JSON.stringify({
                companyName : companyName,
                street : street,
                localNumber : localNumber,
                city : city,
                postalCode : postalCode,
                email : email,
                orderName : orderName,
                brutto : brutto,
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
