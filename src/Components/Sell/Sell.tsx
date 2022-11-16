import React from 'react'
import styles from "./Sell.module.scss"
import GoBack from '../GoBack/GoBack'



function Sell() {
  return (
    <div className={styles.container}>
        <GoBack />
        
        <p className={styles.desc}>Sell Prodcuts and Services</p>
    </div>
  )
}

export default Sell