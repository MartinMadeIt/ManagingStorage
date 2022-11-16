import React from 'react'
import style from "./RemoteQuad.module.scss"
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { AiFillDollarCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';


function RemoteQuad() {
  return (
    <div className={style.container}>
        <Link to="/orders"><FaFileInvoiceDollar /></Link>
        <Link to="/sell"><AiFillDollarCircle /></Link>
        <Link to="/placeorder"><AiOutlineShoppingCart /></Link>
        <Link to="/invoices"><FaFileInvoiceDollar /></Link>
    </div>
  )
}

export default RemoteQuad