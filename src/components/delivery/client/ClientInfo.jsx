import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import validationSchema from "./clientFormSchema";
import useSpacing from "../../../hooks/useSpacing";
import {
  addClients,
  getCategories,
  getClientInfo,
} from "../../../api/delivery";
import { useParams } from "react-router-dom";
import { setFieldValues } from "../../../utils/form-handler";
import { Divider, Grid, MenuItem, Paper, Typography } from "@material-ui/core";
import LinkButton from "../../common/link-button";
import Message from "../../common/message";
import { Autocomplete } from "@material-ui/lab";
import If from "../../common/if";

const AddClients = ({ handleNext }) => {
  const spacing = useSpacing();
  const { id: clientId } = useParams();
  const [isMesageVisible, setMessageVisibility] = useState(false);
  const [resetCategoryField, setResetCategoryField] = useState(true);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const fields = [
    { label: "Client name", name: "name", required: true },
    { label: "Category", name: "category", select: true, options: categories },
    {
      label: "Head office address",
      name: "headOfficeAddress",
      textarea: true,
      rows: 3,
      required: true,
    },
    { label: "Central SPOC", name: "spocName" },
    { label: "Central SPOC contact", name: "spocContact", maxLength: "10" },
    { label: "Email id", name: "email" },
  ];

  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") return;
    setMessageVisibility(false);
  };

  const showMessage = ({ type, text }) => {
    setMessage({ type, text });
    setMessageVisibility(true);
  };

  const initialValues = {
    name: "",
    category: "",
    headOfficeAddress: "",
    spocName: "",
    spocContact: "",
    email: "",
    id: clientId,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = {
        name: values.name || undefined,
        category: values.category || undefined,
        headOfficeAddress: values.headOfficeAddress || undefined,
        spocName: values.spocName || undefined,
        spocContact: values.spocContact || undefined,
        email: values.email || undefined,
        id: values.id || undefined,
      };
      const { status } = await addClients(formData);

      if (status) {
        showMessage({ type: "success", text: "Client added successfully" });
        resetForm();
        setResetCategoryField(!resetCategoryField);
      } else {
        showMessage({ type: "error", text: message });
      }
    } catch (error) {
      const message = error.response.data.message;
      showMessage({ type: "error", text: message });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const { values, handleChange, touched, errors, setFieldValue } = formik;

  const getClientData = async () => {
    const { status, data } = await getClientInfo(clientId);

    if (status) {
      setFieldValues(data, setFieldValue);
    }
  };

  const getCategoriesApi = async () => {
    const { status, data } = await getCategories();
    if (status) {
      setCategories(data.map((each) => ({ title: each, id: each })));
    }
  };

  const handleSelectChange = (event, newValue, name) => {
    newValue ? setFieldValue(name, newValue.id) : setFieldValue(name, "");
  };

  useEffect(() => {
    if (clientId) {
      getClientData();
    }
    getCategoriesApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {`${clientId ? "EDIT" : "ADD"} CLIENTS`}
            </Typography>

            <Divider className={`${spacing.mt3} ${spacing.mb4}`} />
            <form onSubmit={formik.handleSubmit} noValidate>
              {fields.map(
                (
                  {
                    label,
                    textarea,
                    maxLength,
                    rows,
                    name,
                    required,
                    options,
                    select,
                  },
                  index
                ) => (
                  <FormControl
                    fullWidth
                    variant="filled"
                    key={index}
                    className={spacing.mb4}
                  >
                    <If
                      condition={!!select}
                      defaultCase={
                        <TextField
                          id={`outlined-basic-${name}`}
                          label={label}
                          multiline={!!textarea}
                          select={!!select}
                          rows={rows || 1}
                          variant="outlined"
                          name={name}
                          value={values[name]}
                          onChange={handleChange}
                          size="small"
                          inputProps={{
                            maxLength,
                            type: select ? "search" : "text",
                          }}
                          required={!!required}
                          error={touched[name] && Boolean(errors[name])}
                          helperText={touched[name] && errors[name]}
                        >
                          {Array.isArray(options) &&
                            options.map((option) => (
                              <MenuItem value={option} key={option}>
                                {option}
                              </MenuItem>
                            ))}
                        </TextField>
                      }
                    >
                      <Autocomplete
                        key={resetCategoryField}
                        id="category"
                        options={options}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, newValue) =>
                          handleSelectChange(event, newValue, name)
                        }
                        name={name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label={label}
                            variant="outlined"
                          />
                        )}
                      />
                    </If>
                  </FormControl>
                )
              )}
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
              <LinkButton
                to="/delivery/clients"
                variant="contained"
                className={spacing.ml4}
              >
                Goto client listing
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

export default AddClients;
