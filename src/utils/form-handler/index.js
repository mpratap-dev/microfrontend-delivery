export const setFieldValues = (data, setFieldValue) => {
  Object.keys(data).forEach((key) => {
    setFieldValue(key, data[key] || "");
  });
};

export const resetFields = ({ fields, formik, defaultValues = {} }) => {
  const { setFieldValue, setTouched } = formik;
  Array.isArray(fields) &&
    fields.forEach((key) => {
      setFieldValue(key, defaultValues[key] || "");
      setTouched({ [key]: false });
    });
};
