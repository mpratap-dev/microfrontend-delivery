import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import useSpacing from "../../../../hooks/useSpacing";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    formDisplay:{
        justifyContent:'space-between',
        [theme.breakpoints.up('md')]: {
            display:'flex',
        },
    },
    button:{
        background: '#F5E418',
    },
    divider:{
        background: '#F4F2F2',
    },
    textBlock:{
        padding: '13px 10px 7px',
    },
    filtersBlock:{
        padding: "35px 10px 15px"
    }
  }));



const Filters = (props) => {
  const spacing = useSpacing();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
    },
    onSubmit: (values) => {
      props.onSubmit(values);
    },
  });

  return (
    <>
      <Paper>
        <div className={classes.textBlock}>
          <Typography variant="h6">{props.heading}</Typography>
        </div>
        <Divider className={classes.divider} />
        <Grid container className={classes.filtersBlock}>
          <Grid item xs={12} sm={12} md={12}>
            <form
              onSubmit={formik.handleSubmit}
              className={classes.formDisplay}
            //   style={{ display: "flex", justifyContent: "space-between" }}
            >
              {props.fields.map(
                ({
                  placeholder,
                  type,
                  label,
                  textarea,
                  select,
                  rows,
                  name,
                  options,
                }) => (
                  <Grid item xs={12} md={3}>
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
                        InputLabelProps={{ shrink: true, required: true }}
                        select={!!select}
                        variant="outlined"
                        name={name}
                        placeholder={placeholder || ""}
                        size="small"
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        error={
                          formik.touched[name] && Boolean(formik.errors[name])
                        }
                        helperText={formik.touched[name] && formik.errors[name]}
                      >
                        {Array.isArray(options) &&
                          options.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                              {name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                )
              )}
              <Grid item xs={6} md={1}>
              <Button variant="contained" type="submit" className={classes.button} >
                {props.finalButtonText}
              </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Filters;
