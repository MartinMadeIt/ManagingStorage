import * as yup from "yup";


export const yupSetSchema = yup.object({
    name: yup.string(),
    nip: yup.string().min(10).max(10),
    regon: yup.string().min(10).max(10),
    local: yup.string(),
    postalCode: yup.string().matches(/^[0-9]{2}-[0-9]{3}/, "Postal Code is XX-XXX"),
    email: yup.string().email()
})

export const yupSchema = yup.object ({
    companyName: yup.string().required("Field Required"),
    address: yup.string().required().min(12),
    nip : yup.string().required().min(10).max(10),
    regon: yup.string().required().min(9).max(9),
    email: yup.string().email().required(),

    orderName : yup.string().required(),
    brutto: yup.string().required()
  })