import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./HomeBtn.module.scss"

function HomeBtn() {
  return (
    <Link to="/" className={styles.button}>HOME</Link>
  )
}

export default HomeBtn