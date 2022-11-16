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
  address: yup.string().required().min(12),
  nip : yup.string().required().min(10).max(10),
  regon: yup.string().required().min(9).max(9),
  email: yup.string().email().required(),

  orderName : yup.string().required(),
  brutto: yup.string().min(3).required()
})


export type FormValues = InferType<typeof yupSchema>

function CreateNewInvoice() {


  const formik = useFormik<FormValues>({
    initialValues: {
      companyName:"",
      address:"",
      nip:"",
      regon:"",
      email: "",

      orderName : "",
      brutto: ""
    },
    validationSchema: yupSchema,
    onSubmit: (values, {resetForm}) => {
      postAPI("http://localhost:3000", 
              "orders", 
              values.companyName,
              values.address,
              values.nip,
              values.regon,
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
        <TextInput<FormValues> formik={formik} acc={"address"} label={"Street, XX-XXX, City"}/>
        <TextInput<FormValues> formik={formik} acc={"nip"} label={"NIP"}/>
        <TextInput<FormValues> formik={formik} acc={"regon"} label={"REGON"}/>
        <TextInput<FormValues> formik={formik} acc={"email"} label={"E-mail"}/>
        <TextInput<FormValues> formik={formik} acc={"orderName"} label={"Order Title / Name"}/>
        <TextInput<FormValues> formik={formik} acc={"brutto"} label={"Brutto Price"}/>
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default CreateNewInvoice

