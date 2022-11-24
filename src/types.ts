

//      ** TYPES FOR MANAGING NEW ORDER IN INVOICE CREATOR
export type NextOrderType = {
    name:string,
    price:string,
    quantity:string,
    summary:number,
    margin:string,
    vat:string,
    id:number
  }
  
  export interface OrderInfos {
    name:string,
    price:string,
    quantity:number,
    margin:string,
  }
  

  export interface Invoice {
    company: CompanyType,
    date:string,
    items:number[],
    id:number
  }


export interface Order {
  id:number,
  companyName:string,
  nip:string,
  regon:string,
  address:string,
  email:string,
  orderName :string,
  brutto:string,
  completed:boolean;
}

export interface CompanyType {
  name: string,
  nip:string,
  regon:string,
  local: string,
  postalCode: string,
  city: string,
  email: string
}

export interface ContractorType {
  id:number,
  companyName:string,
  nip:string,
  regon:string,
  address:string,
  email:string,
}

export type OrderFetchType = {
  companyName: string,
  address: string,
  nip: string,
  regon: string,
  email: string,
  orderName: string,
  brutto: string,
  orderList: NextOrderType[],
  completed: boolean,
  id: number
}

