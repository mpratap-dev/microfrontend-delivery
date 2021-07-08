import React from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import useSpacing from "../../../../hooks/useSpacing";
import { contactDetailsFields } from "./fields";
import If from "../../../common/if";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { CONTACT_INFO_TYPES } from "../../../../constant/delivery";
const {  HUB_POC } = CONTACT_INFO_TYPES;

const ContactDetails = ({ formik, getIn, SPOCFields, setSPOCFields }) => {
  const spacing = useSpacing();
  const addSPOCFields = () => {
    const spocCount = SPOCFields.length;
    formik.setFieldValue(`contactInfo[${3 + spocCount}][type]`, HUB_POC);
    formik.setFieldValue(`contactInfo[${3 + spocCount}][name]`, '');
    formik.setFieldValue(`contactInfo[${3 + spocCount}][number]`, '');
    setSPOCFields([...SPOCFields, { id: spocCount }]);
  };

  const deleteFields = (id) => {
    setSPOCFields(SPOCFields.filter((field, index) => index !== id));
    formik.setFieldValue(`contactInfo`, formik.values.contactInfo.filter((field, index) => index !== id + 3));
    formik.setTouched({[`contactInfo[${id}]`]: false});
  };

  return (
    <Paper className={`${spacing.pa4} ${spacing.mb4}`}>
      <Typography variant="subtitle2" className={spacing.mb2} color="primary">
        Contact info
      </Typography>

      {contactDetailsFields.map(
        ({
          type,
          label,
          textarea,
          select,
          rows,
          name,
          options,
          shrink,
          maxLength,
        }) => {
          const error = getIn(formik.errors, name);
          const touch = getIn(formik.touched, name);
          const { value } = formik.getFieldProps(name);

          return (
            <FormControl
              fullWidth
              variant="filled"
              key={name}
              className={spacing.mb4}
            >
              <TextField
                id={`outlined-basic-${name}`}
                label={label}
                type={type}
                multiline={!!textarea}
                rows={rows || 1}
                select={!!select}
                variant="outlined"
                InputLabelProps={{
                  shrink: shrink,
                }}
                name={name}
                inputProps={{ maxLength }}
                size="small"
                value={value}
                onChange={formik.handleChange}
                error={touch && Boolean(error)}
                helperText={touch && error}
              >
                {Array.isArray(options) &&
                  options.map(({ id, name }, index) => (
                    <MenuItem key={index} value={id}>
                      {name}
                    </MenuItem>
                  ))}
              </TextField>
            </FormControl>
          );
        }
      )}

      {SPOCFields.map((field, index) => {
        const {id} = field;
        const name = `contactInfo[${3 + index}][name]`;
        const contact = `contactInfo[${3 + index}][number]`;
        const errorName = getIn(formik.errors, name);
        const touchName = getIn(formik.touched, contact);
        const errorContact= getIn(formik.errors, contact);
        const touchContact = getIn(formik.touched, contact);
        
        const nameValue = getIn(formik.values, name);
        const contactValue = getIn(formik.values, contact);

        return (
          <Grid
            container
            key={`${field}-${index}`}
            spacing={2}
            alignItems="flex-start"
            className={spacing.mb2}
          >
            <Grid item sm={6}>
              <FormControl fullWidth variant="filled">
                <TextField
                  variant="outlined"
                  size="small"
                  id={`spoc_name_${index}`}
                  label={`SPOC ${index + 1} name`}
                  name={name}
                  value={nameValue}
                  onChange={formik.handleChange}
                  error={touchName && Boolean(errorName)}
                  helperText={touchName && errorName}
                />
              </FormControl>
            </Grid>

            <Grid item sm={5} className={spacing.pr0}>
              <FormControl fullWidth variant="filled">
                <TextField
                  variant="outlined"
                  size="small"
                  id={`spoc_contact_${id}`}
                  label={`SPOC ${index + 1} contact`}
                  name={contact}
                  value={contactValue}
                  inputProps={{ maxLength: 10 }}
                  onChange={formik.handleChange}
                  error={
                    touchContact && Boolean(errorContact)
                  }
                  helperText={touchContact && errorContact}
                />
              </FormControl>
            </Grid>
            <Grid item sm={1}>
              <If condition={!!index}>
                <IconButton
                  size="small"
                  disabled={SPOCFields.length < 2}
                  onClick={() => deleteFields(index)}
                  aria-label="delete"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </If>
            </Grid>
          </Grid>
        );
      })}

      <If condition={SPOCFields.length < 5}>
        <Button
          variant="contained"
          onClick={addSPOCFields}
          color="primary"
          size="small"
          startIcon={<AddCircleIcon />}
        >
          Add SPOC
        </Button>
      </If>
    </Paper>
  );
};

export default ContactDetails;
