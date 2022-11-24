import { useState, useEffect } from "react"
import GoBack from "../GoBack/GoBack"
import styles from "./InvoiceView.module.scss"
import { useParams } from "react-router-dom"
import { fetchAPI } from "../../Controllers/fetchAPI"
import { CompanyType, Invoice, OrderFetchType} from "../../types"

function InvoiceView() {

  const [company, setCompany] = useState<CompanyType>()
  const [date, setDate] = useState("")
  const [ids, setIds] = useState<number[]>([])
  const [contractorOrder, setContractorOrder] = useState<Partial<OrderFetchType>[]>([])


  const {InvoiceId} = useParams()

  useEffect(() => {
    fetchAPI<Invoice>(`http://localhost:3000/invoices`, `${InvoiceId}`)
      .then(data => {
        setDate(data.date)
        setCompany(data.company)
        setIds(data.items)
      })     
  },[])

  const fetchOrder = (index:string) => {
    fetchAPI<OrderFetchType>(`http://localhost:3000/orders`, String(index))
      .then(data => {
        // OMIT albo Pick i wtedy {...data}
      const newPositionInOrder:Partial<OrderFetchType> = {
          companyName: data.companyName,
          address: data.address,
          nip: data.nip, 
          email: data.email,
          orderList: data.orderList
      }
       
      setContractorOrder(prev => [...prev, newPositionInOrder])
    })}

  useEffect(() => {
    if(typeof ids !== "number") {
      ids.map(index => {
        console.log("Not Number");
        
        fetchOrder(String(index))
      })
    } 
    else if (typeof ids === 'number') {
      console.log("Number");
      
        fetchOrder(String(ids))
    }
  }, [date])

  

  return (
    <div className={styles.container}>
        <GoBack/>
        <div className={styles.document}>
          <div className={styles.topbar}>
            <div className={styles.myCompany}>
              <p className={styles.name}>{company?.name}</p>
              <p>Address: {company?.local}, {company?.postalCode}, {company?.city}</p>
              <p>NIP: {company?.nip}</p>
            </div>
            <p>{date}</p>
          </div>
          <div className={styles.infos}>

            {contractorOrder?.map((element) => {
              console.log(contractorOrder);
              
              return (
                <div className={styles.position} key={element.id}>
                  <p className={styles.companyDescription}>{element.companyName}, {element.address}, NIP: {element.nip}</p>
                  <table>
                    <thead>
                      <tr>
                        <td>Position</td>
                        <td>Price per 1</td>
                        <td>Quantity</td>
                        <td>Margin</td>
                        <td>Sum Price</td>
                      </tr>
                    </thead>

                    <tbody>
                      {element.orderList?.map((item) => {
                        return (
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{Number(item.margin)*100}%</td>
                            <td>{item.summary}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
            })}

          </div>
        </div>
    </div>
  )
}

export default InvoiceView