import * as yup from 'yup';

const validationSchema = yup.object({
  clientId: yup
    .number()
    .required('clientId is required'),
  clientDriverId: yup.string().nullable(),  
  clientDriverMobile: yup 
    .string().when('clientDriverId', {
      is: (value) => !(value),
      then: yup.string().required('Please enter either driver id or driver mobile number')
    })
    .matches(/^[5-9]\d{9}$/, "Please enter a valid contact number")
    .nullable(),
});

export default validationSchema;