import styles from './Home.module.scss'
import { Link } from 'react-router-dom'
import {deafultAccountBalance} from "../../config"
import { useAppSelector } from '../../Redux/hooks';
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useState } from 'react'
import { fetchAPI } from '../../Controllers/fetchAPI'
import { CompanyType } from '../../types';


function Home() {

  const [name, setName] = useState("")

  const account = useAppSelector((state) => state.money.value)
  const numberTopercentage = Math.round(account/deafultAccountBalance*100)
  const accountPercentage = numberTopercentage>100 ? 100 : numberTopercentage;

  useEffect(() => {
    fetchAPI<CompanyType>("http://localhost:3000", "company")
      .then(data => setName(data.name))
  }, [])

  return (
    <div className={styles.container}>
        <div className={styles.person}>
            <Link to="/manage" className={styles.avatar} />
            <Link to='/settings' className={styles.settings}><AiOutlineSetting/></Link>
            <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.ballance}>{accountPercentage}%</div>
    </div>
  )
}

export default Home