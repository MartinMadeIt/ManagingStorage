import GoBack from "../GoBack/GoBack"
import styles from "./InvoiceView.module.scss"

function InvoiceView() {
  return (
    <div className={styles.container}>
        <GoBack/>
        <div className={styles.document}>
          
        </div>
    </div>
  )
}

export default InvoiceView