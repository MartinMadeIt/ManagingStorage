import { useState, useEffect } from "react"
import GoBack from "../GoBack/GoBack"
import styles from "./InvoiceView.module.scss"
import { useParams } from "react-router-dom"
import { fetchAPI } from "../../Controllers/fetchAPI"
import { CompanyType, Order } from "../Orders/Orders"

export interface ContractorType {
  id:number,
  companyName:string,
  nip:string,
  regon:string,
  address:string,
  email:string,
}

function InvoiceView() {

  const [company, setCompany] = useState<CompanyType>()
  const [contractorData, setContractor] = useState<ContractorType>()
  const [order, setOrder] = useState<Order[]>()

  const {InvoiceId} = useParams()

  useEffect(() => {
    fetchAPI<CompanyType>("http://localhost:3000", "company")
      .then(data => setCompany(data))
  }, [company])

  return (
    <div className={styles.container}>
        <GoBack/>
        <div className={styles.document}>
          
        </div>
    </div>
  )
}

export default InvoiceView