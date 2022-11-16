import { useNavigate } from 'react-router-dom'
import styles from "./GoBack.module.scss"
import { AiOutlineRollback } from "react-icons/ai";

function GoBack() {

    const navigate = useNavigate()

    return (
        <button className={styles.arrow} onClick={() => navigate(-1)}><AiOutlineRollback /></button>
    )
}

export default GoBack