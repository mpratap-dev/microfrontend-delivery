import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import validationSchema from "./DriverDetailsFormSchema";
import useSpacing from "../../../hooks/useSpacing";
import { addDriverDetails, getClients, getDriverDetails, editDriverDetails } from "../../../api/delivery";
import { useParams } from "react-router-dom";
import { Divider, Grid, Paper, Typography } from "@material-ui/core";
import LinkButton from "../../common/link-button";
import Message from "../../common/message";
import AsyncSelect from "../../common/async-select";

const fields = [
  { label: "Client Driver ID", name: "clientDriverId"},
  { label: "Driver Mobile", name: "clientDriverMobile", maxLength: 10 },
];

const AddDriverDetails = () => {
  const spacing = useSpacing();
  const { id } = useParams();
  const [isMesageVisible, setMessageVisibility] = useState(false);
  const [selectedOption, setClient] = useState({});
  const [message, setMessage] = useState({
    type: '',
    text: ''
  });

  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setMessageVisibility(false);
  };

  const showMessage = ({type, text}) => {
    setMessage({type, text});
    setMessageVisibility(true);
  }

  const initialValues = {
    clientId: "",
    clientDriverId: "",
    clientDriverMobile: ""
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = {
        clientId: values.clientId || undefined,
        clientDriverId: values.clientDriverId || undefined,
        clientDriverMobile: values.clientDriverMobile || undefined,
      };

      let response = {};

      if(id) {
        formData.id = id;
        response = await editDriverDetails(id, formData);
      } else {
        response = await addDriverDetails(formData);
      }

      const { status, message } = response;

      if (status) {
        showMessage({type: 'success', text: `Driver details ${id ? 'updated': 'added'} successfully`});
        !id && resetForm();
      } else {
        showMessage({type: 'error', text: message});
      }
    } catch(error) {
      const message = error.response.data.message;
      showMessage({type: 'error', text: message});
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const { values, touched, errors, handleChange } = formik;
  
  const getFilterData = (field, term) => ({
    search_via: field,
    search_val: term,
    page_number: 1, 
    page_size: 10
  });

  const getClientsApi = (term) => getClients(getFilterData('name', term));
  
  const getDriverData = async () => {
    const { status, data } = await getDriverDetails(id);
    if(status) {
      Object.keys(initialValues).forEach((key) => {
        if(!data[key]) return;
        
        if(key === 'clientId' && data.clientName) {
          setClient({id: data[key], name: data.clientName});
        }
        
        formik.setFieldValue(key, data[key]);
      });
    }
  }

  useEffect(() => {
    if(id) {
      getDriverData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(values);
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={8} md={6}>
          <Paper
            className={`${spacing.pt4} ${spacing.pb4} ${spacing.pl4} ${spacing.pr4}`}
          >
            <Typography
              variant="subtitle1"
              component="strong"
              className={spacing.mb0}
              color="primary"
            >
              {`${id ? "EDIT" : "ADD"} CLIENTS`}
            </Typography>

            <Divider className={`${spacing.mt3} ${spacing.mb4}`} />
            <form onSubmit={formik.handleSubmit} noValidate>
              <FormControl fullWidth variant="filled" className={spacing.mb4} required>
                <AsyncSelect
                  id="search-client"
                  required
                  label="Search client"
                  api={getClientsApi}
                  name="clientId"
                  defaultValue={selectedOption}
                  style={{ width: "100%" }}
                  dataKey="result"
                  format={{ id: "id", text: "name" }}
                  value={values.clientId}
                  onChange={handleChange}
                  error={
                    touched.clientId && Boolean(errors.clientId)
                  }
                  helperText={touched.clientId && errors.clientId}
                />
              </FormControl>
              {fields.map(
                ({type, label, textarea, maxLength, rows, name, required }, index) => {
                  return (
                  <FormControl
                    fullWidth
                    variant="filled"
                    key={index}
                    className={spacing.mb4}
                  >
                    <TextField
                      id={`outlined-basic-${name}`}
                      label={label}
                      multiline={!!textarea}
                      rows={rows || 1}
                      variant="outlined"
                      name={name}
                      type={type}
                      value={values[name]}
                      onChange={formik.handleChange}
                      size="small"
                      inputProps={{maxLength}}
                      required={!!required}
                      error={touched[name] && Boolean(errors[name])}
                      helperText={touched[name] && errors[name]}
                    />
                  </FormControl>
                )}
              )}
              {/* <FormControl fullWidth variant="filled" className={spacing.mb4} required>
                <AsyncSelect
                  id="search-mobile"
                  label="Search mobile no."
                  api={getDriverMobile}
                  name="clientDriverMobile"
                  style={{ width: "100%" }}
                  dataKey="clientDriverMapping"
                  format={{ key: "clientDriverMobile", text: "clientDriverMobile" }}
                  value={values.clientDriverMobile}
                  onChange={handleDropdownChange}
                  setFieldValue={formik.setFieldValue}
                  error={
                    touched.clientDriverMobile && Boolean(errors.clientDriverMobile)
                  }
                  helperText={touched.clientDriverMobile && errors.clientDriverMobile}
                />
              </FormControl> */}
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
              <LinkButton
                to="/home/dashboard/delivery/driver-details"
                variant="contained"
                className={spacing.ml4}
              >
                Go to Driver Details listing
              </LinkButton>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Message 
        open={isMesageVisible} 
        text={message.text} 
        type={message.type} 
        handleClose={handleMessageClose} 
      />
    </>
  );
};

export default AddDriverDetails;
