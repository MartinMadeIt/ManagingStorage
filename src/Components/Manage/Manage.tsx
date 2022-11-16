import React, { useState } from 'react'
import styles from "./Manage.module.scss"
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { withdraw, deposit } from '../../Redux/moneySlice'
import GoBack from '../GoBack/GoBack'
import RemoteQuad from '../RemoteQuad/RemoteQuad'


function Manage() {

    const dispatch = useAppDispatch();
    const account = useAppSelector((state) => state.money.value);
    const [inputValue, setInputValue] = useState(0)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(Number(e.target.value))
    }

    const handleDeposit = () => dispatch(deposit(inputValue))
    const handleWithdraw = () => dispatch(withdraw(inputValue))

    return (
        <div className={styles.container}>
            <GoBack />
            <RemoteQuad />
            <div className={styles.accountBallance}>{account} PLN</div>
            <div className={styles.actions}>
                <input type="number"  className={styles.amount} onChange={handleInputChange}/>
                <div className={styles.buttons}>
                    <button className={styles.deposit} onClick={()=> {handleDeposit()}}>Deposit</button>
                    <button className={styles.withdraw} onClick={()=> {handleWithdraw()}}>Withdraw</button>
                </div>

            </div>
        </div>
    )
}

export default Manage