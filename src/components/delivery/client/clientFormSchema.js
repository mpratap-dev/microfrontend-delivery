import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  category: yup
    .string(),
  headOfficeAddress: yup
    .string()
    .required('Address is required'),
  spocName: yup
    .string(),
  spocContact: yup
    .string()
    .matches(/^[5-9]\d{9}$/, "Please enter a valid contact number"),
  email: yup
    .string()
    .email('Please enter a valid email address'),
});

export default validationSchema;