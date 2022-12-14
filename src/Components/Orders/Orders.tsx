import React, { useEffect, useState } from 'react'
import styles from "./Orders.module.scss"
import { fetchAPI } from '../../Controllers/fetchAPI'
import GoBack from '../GoBack/GoBack'
import { addOrder, removeOrder } from '../../Redux/orderSlice'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { withdraw } from '../../Redux/moneySlice'
import { Order } from '../../types'

// TANSTACK 

function Orders() {

    const dispatch = useAppDispatch();
    const order = useAppSelector((state) => state.orders);
    const account = useAppSelector((state) => state.money.value);
    const [datas, setDatas] = useState<Order[]>([])
    const [companyInfos, setCompanyInfos] = useState({})
    const [fetchAgain, setFetchAgain] = useState(false)



    const getDatas = fetchAPI<Order[]>("http://localhost:3000", "orders");
    const getCompany  = fetchAPI<Order[]>("http://localhost:3000", "company");

    useEffect(() => {
        Promise.all([getDatas, getCompany]).then(files => {
            setDatas(files[0])
            setCompanyInfos(files[1])
        })
    // eslint-disable-next-line
    },[fetchAgain])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, 
        values:Order) => {
        if(e.target.checked) {
            dispatch(addOrder({...values}))           
        } else {
            dispatch(removeOrder({id: values.id}))      
        }
    }

    const handleSubmit = () => {
        const summaryPrice:number = order.reduce((sum, item) => {return sum + Number(item.brutto)}, 0)

        if( summaryPrice <= account) {
            let ids:number[] = [];
            for (let item of order) {
                ids.push(item.id)
            }

            const today = new Date();
            const formattedToday:string = `${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`

            const promises = order.map(async ({id}) => {
                const response = await fetch(`http://localhost:3000/orders/${id}`,
                {method: 'PATCH',
                body: JSON.stringify({
                    completed: true,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }}
                )
                if (!response.ok) {
                    return []
                }
                const data = await response.json();
                return data
            })

            Promise.all(promises)
                .then(data => data);
       
                

            if(order.length>0){
            fetch(`http://localhost:3000/invoices`,
                {
                    method  : "POST",
                    headers: {
                        "Content-type" : "application/json"},
                        body : JSON.stringify({
                            "date":formattedToday,
                            "items": ids,
                            "company": companyInfos

                        })
                    })
                .then(response => {
                    if(!response.ok) {
                        return []
                    }
                    return response.json()
                })
                .then(datas => {
                    ids.forEach(id => dispatch(removeOrder({id})))
                    return datas})
        }
        setFetchAgain(prev => !prev)
    }   
        
        dispatch(withdraw(summaryPrice)) 
    }

    const ifInOrder = (id: number) => {
        return Boolean(order.find(el => el.id === id));
    }

  return (
    <div className={styles.container}>
        <GoBack />
        {datas.filter(position => !position.completed).map(element => 
        {        
        return (
        <div className={styles.order} key={element.id}>
            <p className={styles.orderName}>{element.orderName} (<span className={styles.little}>{element.companyName}</span>)</p>
            <div className={styles.checkAndPrice}>
                <p>{element.brutto} PLN</p>
                <input type="checkbox" name="orderComplete" onChange={e => handleChange(e, element)} checked={ifInOrder(element.id)} />
            </div>
        </div>)
        }
            )}
        {datas ? <button onClick={handleSubmit} className={styles.payBtn}>Pay</button> 
        : <p className={styles.nothingHere}>Nothing unpayed left. Good job !</p>}
    </div>
  )
}

export default Orders