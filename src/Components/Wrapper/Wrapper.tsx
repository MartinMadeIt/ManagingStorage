import React from 'react'
import styles from "./Wrapper.module.scss"

type Children = {
    children: React.ReactNode
}

function Wrapper({children}:Children) {
  return (
    <div className={styles.container}>{children}</div>
  )
}

export default Wrapper;