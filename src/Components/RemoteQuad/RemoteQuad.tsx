import React from 'react'
import style from "./RemoteQuad.module.scss"
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { AiFillDollarCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import { Link } from 'react-router-dom';


function RemoteQuad() {
  return (
    <div className={style.container}>
        <Link to="/orders"><BsCashStack /></Link>
        <Link to="/magazine"><AiFillDollarCircle /></Link>
        <Link to="/placeorder"><AiOutlineShoppingCart /></Link>
        <Link to="/invoices"><FaFileInvoiceDollar /></Link>
    </div>
  )
}

export default RemoteQuad