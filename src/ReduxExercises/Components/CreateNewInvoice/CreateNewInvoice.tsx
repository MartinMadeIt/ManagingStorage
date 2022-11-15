import styles from "./CreateNewInvoice.module.scss"
import GoBack from '../GoBack/GoBack'
import * as yup from "yup";
import { useFormik } from "formik";
import TextInput from "../TextInput/TextInput";
import { InferType } from "yup";
import postAPI from "../../Controllers/postAPI";

const requiredMes = "Field Required"

const yupSchema = yup.object ({
  companyName: yup.string().required(requiredMes),
  street: yup.string().required().min(3).max(30),
  localNumber : yup.string(),
  city: yup.string().required().min(3).max(30),
  postalCode: yup.string().matches(/^[0-9]{2}-[0-9]{3}/, "Postal Code is XX-XXX").required(requiredMes),
  email: yup.string().email().required(),

  orderName : yup.string().required(),
  brutto: yup.string().min(3).required()
})


export type FormValues = InferType<typeof yupSchema>

function CreateNewInvoice() {


  const formik = useFormik<FormValues>({
    initialValues: {
      companyName:"",
      street:"",
      localNumber:"",
      city:"",
      postalCode:"",
      email: "",

      orderName : "",
      brutto: ""
    },
    validationSchema: yupSchema,
    onSubmit: (values, {resetForm}) => {
      postAPI("http://localhost:3000", 
              "orders", 
              values.companyName,
              values.street,
              values.localNumber,
              values.city,
              values.postalCode,
              values.email,
              values.orderName,
              values.brutto,
              false
            )
      resetForm()
    }
  })



  return (
    <div className={styles.container}>
      <GoBack />
          
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextInput<FormValues> formik={formik} acc={"companyName"} label={"Company Name"}/>
        <TextInput<FormValues> formik={formik} acc={"street"} label={"Street"}/>
        <TextInput<FormValues> formik={formik} acc={"localNumber"} label={"Local Number"}/>
        <TextInput<FormValues> formik={formik} acc={"city"} label={"City"}/>
        <TextInput<FormValues> formik={formik} acc={"postalCode"} label={"Postal Code"}/>
        <TextInput<FormValues> formik={formik} acc={"email"} label={"E-mail"}/>
        <TextInput<FormValues> formik={formik} acc={"orderName"} label={"Order Title / Name"}/>
        <TextInput<FormValues> formik={formik} acc={"brutto"} label={"Brutto Price"}/>
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default CreateNewInvoice

