import { useEffect, useState } from "react"
import styles from "./Settings.module.scss"
import { useFormik } from "formik";
import TextInput from "../TextInput/TextInput";
import { InferType } from "yup";
import { fetchAPI } from "../../Controllers/fetchAPI";
import { CompanyType } from "../../types"
import { Link } from "react-router-dom";
import { FaRegTimesCircle } from "react-icons/fa";
import { yupSetSchema } from "../../yupSchemas";

type FormValues = InferType<typeof yupSetSchema>

function Settings() {

    const [data, setData] = useState<CompanyType|null>(null)
    const [fetchAgain, setFetchAgain] = useState(false)

    useEffect(() => {
        fetchAPI<CompanyType>("http://localhost:3000", "company")
          .then(data => setData(data))
      }, [fetchAgain])

    const initialValues = data 
    ? {...data} 
    : {
        name:"",
        nip:"",
        regon:"",
        local:"",
        postalCode:"",
        email:""
    }

    const settingsUpdate = useFormik<FormValues>({
        enableReinitialize : true,
        initialValues,
        onSubmit: (values) => {
            fetch(`http://localhost:3000/company`,
            {
                method  : "PATCH",
                headers: {
                    "Content-type" : "application/json"},
                    body : JSON.stringify({
                        name: values.name,
                        nip : values.nip,
                        regon : values.regon,
                        local : values.local,
                        email : values.email,
                    }
            )})
                .then(response => {
                    if(!response.ok) {
                        return []
                    }
                    return response.json()
                })
                .then(datas => datas)
            setFetchAgain(prev => !prev)
                },
        validationSchema: yupSetSchema


    })

    return (
        <div className={styles.container}>
            <div className={styles.settings}>
            <Link to="/" className={styles.buttonExit}><FaRegTimesCircle /></Link>
                <div className={styles.actual}>
                    <p className={styles.desc}>Actual company data:</p>
                    <div className={styles.infos}>
                        <p>Name: {data?.name}</p>
                        <p>NIP: {data?.nip}</p>
                        <p>REGON: {data?.regon}</p>
                        <p>Address: {data?.local}</p>
                        <p>E-mail: {data?.email}</p>
                    </div>
                </div>
                <form className={styles.form} onSubmit={settingsUpdate.handleSubmit}>
                    <TextInput formik={settingsUpdate} acc={"name"} label={"Company name"} disabled={false} />
                    <TextInput formik={settingsUpdate} acc={"nip"} label={"NIP"} disabled={false}  />
                    <TextInput formik={settingsUpdate} acc={"regon"} label={"REGON"}  disabled={false} />
                    <TextInput formik={settingsUpdate} acc={"local"} label={"Address"}  disabled={false} />
                    <TextInput formik={settingsUpdate} acc={"email"} label={"E-mail"}  disabled={false} />
                    <button type="submit" className={styles.submit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Settings