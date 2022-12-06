import { useEffect, useState } from "react";
import GoBack from "../GoBack/GoBack";
import styles from "../Magazine/Magazine.module.scss"

interface TimeType {
  days:number,
  hours:number,
  minutes:number,
  seconds:number
}

function Magazine() {

  const today = new Date();
  const openMagazineDate = new Date('2022-12-23T12:00:00')

  const [time, setTime] = useState<TimeType>()

  useEffect(() => {
    setTimeout(()=> {
      const time:number = openMagazineDate.getTime() - today.getTime()
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((time % (1000 * 60)) / 1000);

      setTime({days:Math.round(days), hours:Math.round(hours), minutes:Math.round(minutes), seconds:Math.round(seconds)})   
    }, 1000)
  // eslint-disable-next-line
  }, [time])

  const addZeroBefore = (item:number) => {
    if(item >= 10) {
      return String(item)
     }else { 
      return `0${item}`}
  }

  return (
    <div className={styles.container}>
      <GoBack />
      <div className={styles.information}>
        <h1>Hello Visitor !</h1>
        <p className={styles.description}>
          Magazine is one of the most important pilar in Managing Supply App. Due to it Magazine is under maintance 
          beacuse of migration database from json-server to postgreSQL. So don't forget about us and stay tuned !
        </p>
        <p className={styles.announcment}>
          We do our best to open our magazine in:
        </p>
        <div className={styles.time}>
          <p>{time?.days} {Number(time?.days) > 1 ? "days" : "day"} and </p>
          <p>{addZeroBefore(Number(time?.hours))} : {addZeroBefore(Number(time?.minutes))} : {addZeroBefore(Number(time?.seconds))}</p>

        </div>
      </div>
    </div>
  )
}

export default Magazine;