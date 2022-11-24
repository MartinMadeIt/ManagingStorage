import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAPI } from '../../Controllers/fetchAPI'
import GoBack from '../GoBack/GoBack'
import style from "./Invoices.module.scss"
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Invoice } from '../../types'

function File ({element}:{element:Invoice}) {
  return ( 
    <div key={element.id} className={style.invoice}>
      <p className={style.icon}><FaFileInvoiceDollar/></p>
      <Link to={`${element.id}`} className={style.desc}>{element.id}/{element.date}</Link>
    </div>
  )
}

function Invoices() {

  const [data, setData] = useState<Invoice[]>([]);
  const [invoicesDate, setInvoicesDate] = useState<string[]>([]);
  const [all, setAll] = useState(false)

  useEffect(() => {
    fetchAPI<Invoice[]>("http://localhost:3000", "invoices")
        .then(data => setData(data))
  }, [])

  const spliceDate = (date:string) => {
    const sliced = date.split(/\/|-|\./)
    return sliced.sort()
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => setInvoicesDate(spliceDate(e.target.value))
  const checkDate = (position:Invoice) => (spliceDate(position.date)[0] === invoicesDate[0]) && (spliceDate(position.date)[1] === invoicesDate[1])

  return (
    <div className={style.container}>
        <GoBack />
        <input type="date" name="date" id="invoiceDate" className={style.date} onChange={handleChange}/>
        <button onClick={() => {setAll(!all)}} className={style.showAll}>
          <div className={all ? style.allStatusActive : style.allStatus}></div>
          <p>Show All</p>
          </button>
        <div className={style.list}>
          {
          all ? data.map(element => <File element={element} /> ) 
          : data.filter(position =>  checkDate(position)).map(element =>  <File element={element} />)
          }
        </div>
    </div>
  )
}

export default Invoices