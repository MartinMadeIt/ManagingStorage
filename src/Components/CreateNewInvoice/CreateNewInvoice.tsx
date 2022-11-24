import styles from "./CreateNewInvoice.module.scss"
import GoBack from '../GoBack/GoBack'
import { useFormik } from "formik";
import TextInput from "../TextInput/TextInput";
import { InferType } from "yup";
import postAPI from "../../Controllers/postAPI";
import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { NextOrderType, OrderInfos } from "../../types";
import { TiDeleteOutline } from "react-icons/ti";
import {  yupSchema } from "../../yupSchemas";


 let i = 1;

  export type FormValues = InferType<typeof yupSchema>

  const initialValues:FormValues={
      companyName:"",
      address:"",
      nip:"",
      regon:"",
      email: "",

      orderName : "",
      brutto: ""
    }

  function CreateNewInvoice() {

  const [orderList, setOrderList] = useState<NextOrderType[]>([])

  const [orderName, setOrderName] = useState("");
  const [margin, setMargin] = useState("");
  const [orderPrice, setOrderPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [disabled, setDisabled] = useState(false)
  const [boxVisible, setBoxVisible] = useState(false)


  const formik = useFormik<FormValues>({
    initialValues: initialValues,
    validationSchema: yupSchema,
    onSubmit: (values, {resetForm}) => {
      postAPI({api: "http://localhost:3000", 
              endpoint: "orders", 
              ...values,
              orderList,
              completed: false}
            )
      resetForm()
      setOrderList([])
    }
  })

  const boxFormik = useFormik<OrderInfos>({
    initialValues: {
      name:"",
      price:"",
      quantity:0,
      margin:"",
    },
    onSubmit: (vals, {resetForm}) => {
      if (Number(orderPrice) > 0 && Number(quantity) > 0) {
      const fee = String(Math.round(Number(orderPrice) * Number(margin) * Number(quantity)))
      const summary = Number(orderPrice) * Number(quantity)
      const newPosition:NextOrderType = {
        id: i++,
        name: orderName,
        price: orderPrice,
        quantity:quantity,
        summary:summary,
        margin: margin,
        vat:fee
      }

      setOrderList(prev => [...prev, newPosition])
      resetForm()
    }
    },

  })

  const addToList = () => {
    formik.values.orderName = String(orderList? orderList[0].name + "(...)" : "Order")
    formik.values.brutto = String(sumThePrice())
    setBoxVisible(false)
  }

  const changeInputName = (e: React.ChangeEvent<HTMLInputElement>) => setOrderName(e.target.value)
  const changeInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => setOrderPrice(e.target.value)
  const changeInputMargin= (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(Number(e.target.value)) {
      setDisabled(false)
      setMargin(e.target.value)
    } else {
      setDisabled(true)
    }
  }

  const changeInputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)

  
  const sumThePrice = () => orderList.reduce((sum, element) => sum + +element.summary,0)

  const deletePosition = (e:React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.parentElement?.parentElement
    setOrderList(orderList.filter(position => position.id !== Number(id?.id)))
    console.log(id?.id);
  }

  return (
    <div className={styles.container}>
      <GoBack />
      {boxVisible &&
        <div className={styles.boxContainer}>
          <div className={styles.insideContainer}>
            <form className={styles.position} onSubmit={boxFormik.handleSubmit}>
              <input type="text" className={styles.orderPos} name="name" placeholder="Order position" onChange={changeInputName}/>
              <select className={styles.margin} name="margin" id="margin" onChange={changeInputMargin}>
                <option value="" >X</option>
                <option value="0.23">23%</option>
                <option value="0.08">8%</option>
              </select>
              <input className={styles.price} type="text"name="price" placeholder="Price" onChange={changeInputPrice}/>
              <input className={styles.quantity} type="number" name="quantity" placeholder="Quantity" onChange={changeInputQuantity} />
              <button className={styles.addNext} type="submit" disabled={disabled}>+</button>
            </form>
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Brutto per 1</td>
                    <td>Quantity</td>
                    <td>Brutto sum</td>
                    <td>Margin</td>
                    <td>VAT</td>
                    <td>X</td>
                  </tr>
                </thead>

                <tbody>
                  {orderList.map((pos, index)=> {
                    return (
                      <tr key={index} className={styles.tbodyTr} id={String(pos.id)}>
                        <td>{pos.name}</td>
                        <td>{pos.price} PLN</td>
                        <td>{pos.quantity}</td>
                        <td>{pos.summary} PLN</td>
                        <td>{Number(pos.margin)*100}%</td>
                        <td>{pos.vat} PLN</td>
                        <td><button type="button" onClick={deletePosition} id={String(index)} className={styles.delete} ><TiDeleteOutline /></button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
              <div className={styles.summary}>
                <p>Summary</p>
                <p>{sumThePrice()} PLN</p>
              </div>
            <button onClick={addToList} className={styles.addToList}>Add</button>
          </div>
        </div>
      }
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextInput<FormValues> formik={formik} acc={"companyName"} label={"Company Name"} disabled={false} />
        <TextInput<FormValues> formik={formik} acc={"address"} label={"Street, XX-XXX, City"} disabled={false} />
        <TextInput<FormValues> formik={formik} acc={"nip"} label={"NIP"} disabled={false} />
        <TextInput<FormValues> formik={formik} acc={"regon"} label={"REGON"} disabled={false} />
        <TextInput<FormValues> formik={formik} acc={"email"} label={"E-mail"} disabled={false} />
        <div className={styles.name}>
          <TextInput<FormValues> formik={formik} acc={"orderName"} label={"Order Title / Name"} disabled={true} /> 
          <button type="button" onClick={()=> {setBoxVisible(true)}}><BiAddToQueue/></button>
        </div>
        <TextInput<FormValues> formik={formik} acc={"brutto"} label={"Brutto Price"} disabled={true} />
        <button type="submit" className={styles.submit}>Submit</button>
      </form>

    </div>
  )
}

export default CreateNewInvoice

