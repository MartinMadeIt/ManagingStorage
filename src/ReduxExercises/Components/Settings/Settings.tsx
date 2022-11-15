import { useEffect, useState } from "react"
import styles from "./Settings.module.scss"
import { useFormik } from "formik";
import TextInput from "../TextInput/TextInput";
import { InferType } from "yup";
import * as yup from "yup";
import { fetchAPI } from "../../Controllers/fetchAPI";
import { CompanyType } from "../Orders/Orders";
import { Link } from "react-router-dom";
import { FaRegTimesCircle } from "react-icons/fa";

const yupSetSchema = yup.object({
    name: yup.string(),
    nip: yup.string().min(10).max(10),
    regon: yup.string().min(10).max(10),
    local: yup.string(),
    postalCode: yup.string().matches(/^[0-9]{2}-[0-9]{3}/, "Postal Code is XX-XXX"),
    email: yup.string().email()
})

type FormValues = InferType<typeof yupSetSchema>

function Settings() {

    const [data, setData] = useState<CompanyType|null>(null)

    useEffect(() => {
        fetchAPI<CompanyType>("http://localhost:3000", "company")
          .then(data => setData(data))
      }, [data])

    const initialValues = data ? {...data} 
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
                    <TextInput formik={settingsUpdate} acc={"name"} label={"Company name"} />
                    <TextInput formik={settingsUpdate} acc={"nip"} label={"NIP"} />
                    <TextInput formik={settingsUpdate} acc={"regon"} label={"REGON"} />
                    <TextInput formik={settingsUpdate} acc={"local"} label={"Address"} />
                    <TextInput formik={settingsUpdate} acc={"email"} label={"E-mail"} />
                    <button type="submit" className={styles.submit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Settings