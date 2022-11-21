import { TextField } from "@mui/material";
import { FormikProps } from "formik";
import styles from "./TextInput.module.scss"



function TextInput<T>({formik, acc, label, disabled}:{formik:FormikProps<T>; acc:keyof T, label:string, disabled:boolean}) {
  return (
    <TextField
    error={Boolean(formik.touched[acc]) && Boolean(formik.errors[acc])}
    helperText={
           formik.touched[acc] && formik.errors[acc]
             ? (formik.errors[acc] as string)
             : null
         }
    id={String(acc)}
    name={String(acc)}
    label={label}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values[acc]}
    className={styles.formInput}
    disabled={disabled}
    />
  )
}

export default TextInput