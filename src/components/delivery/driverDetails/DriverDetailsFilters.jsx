import React from "react";
import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import If from "../../common/if";
import { useFormik } from "formik";
import { DRIVER_DETAILS_STATE } from "../../../constant/delivery";
import AsyncSelect from "../../common/async-select";
import { getClients } from "../../../api/delivery";

const DriverDetailsFilters = ({filterData, setFilterData}) => {
  const getFilterData = (field, term) => ({
    search_via: term ? field : undefined,
    search_val: term || undefined,
    page_number: 1, 
    page_size: 10
  });

  const initialValues = {
    search_via: 'id',
    id: '',
    client_id: '',
    driver_id: '',
    state: '',
    client_driver_mobile: '',
    client_driver_id: ''
  }

  const applyFilters = (values) => {
    const activeField = values.search_via;
    const activeFieldValue = values[activeField];
    setFilterData({...filterData, page_number: 1, search_via: activeField, search_val: activeFieldValue });
  }

  const formik = useFormik({
    initialValues,
    onSubmit: applyFilters,
  });

  const { values, handleSubmit, handleChange, resetForm } = formik;
  const activeFilter = values.search_via;

  const resetFilters = () => {
    resetForm();
    setFilterData({...filterData, page_number: 1, search_via: undefined, search_val: undefined });
  }

  const getClientsApi = (term) => getClients(getFilterData('name', term));

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justify="flex-end">
        <Grid item>
          <TextField
            id="hub-status"
            select
            style={{ width: 190 }}
            label="Search by"
            name="search_via"
            value={values.search_via}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="client_id">Client</MenuItem>
            <MenuItem value="state">Status</MenuItem>
            <MenuItem value="driver_id">OYE Driver ID</MenuItem>
            <MenuItem value="client_driver_mobile">Driver Contact</MenuItem>
            <MenuItem value="client_driver_id">Client Driver ID</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <If condition={activeFilter === "id"}>
            <TextField
              id="id"
              style={{ width: 190 }}
              label="ID"
              name="id"
              value={values.id}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </If>
          <If condition={activeFilter === "client_id"}>
            <AsyncSelect
              id="search-client"
              label="Search client"
              style={{ width: 190 }}
              api={getClientsApi}
              name="client_id"
              dataKey="result"
              value={values.client_id}
              onChange={handleChange}
              format={{ id: "id", text: "name" }}
            />
          </If>
          <If condition={activeFilter === "client_driver_mobile"}>
            <TextField
              id="driver-contact"
              style={{ width: 190 }}
              label="Driver Contact"
              type="number"
              name="client_driver_mobile"
              variant="outlined"
              value={values.client_driver_mobile}
              onChange={handleChange}
              size="small"
            />
          </If>
          <If condition={activeFilter === "driver_id"}>
            <TextField
              id="driver-id"
              style={{ width: 190 }}
              label="OYE Driver ID"
              name="driver_id"
              variant="outlined"
              value={values.driver_id}
              onChange={handleChange}
              size="small"
            />
          </If>
          <If condition={activeFilter === "client_driver_id"}>
            <TextField
              id="client-driver-id"
              style={{ width: 190 }}
              label="Client Driver ID"
              name="client_driver_id"
              variant="outlined"
              value={values.client_driver_id}
              onChange={handleChange}
              size="small"
            />
          </If>
          <If condition={activeFilter === "state"}>
            <TextField
              id="client-status"
              select
              style={{ width: 190 }}
              label="Select status"
              name="state"
              onChange={handleChange}
              value={values.state}
              variant="outlined"
              size="small"
            >
              {
                DRIVER_DETAILS_STATE.map((state, index) => {
                  return <MenuItem value={index+1} key={index+1}>{state}</MenuItem>
                })
              }
            </TextField>
          </If>
        </Grid>
        <Grid item>
          <ButtonGroup>
            <Button color="primary" variant="contained" type="submit" >
              Apply
            </Button>
            <Button color="default" variant="contained" onClick={resetFilters}>
              Reset
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
};

export default DriverDetailsFilters;
