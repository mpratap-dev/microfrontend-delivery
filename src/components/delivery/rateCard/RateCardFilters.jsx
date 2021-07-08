import React from "react";
import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import If from "../../common/if";
import { useFormik } from "formik";
import AsyncSelect from "../../common/async-select";
import { getClients, getHubs } from "../../../api/delivery";

const RateCardFilters = ({ filterData, setFilterData }) => {
  const initialValues = {
    search_via: "id",
    client_id: "",
    client_hub_id: "",
    id: "",
    // unit: '',
    state: "",
  };

  const applyFilters = (values) => {
    const activeField = values.search_via;
    const activeFieldValue = values[activeField];
    setFilterData({
      ...filterData,
      page_number: 1,
      search_via: activeField,
      search_val: activeFieldValue,
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: applyFilters,
  });

  const { values, handleSubmit, handleChange, resetForm } = formik;
  const activeFilter = values.search_via;

  const resetFilters = () => {
    resetForm();
    setFilterData({
      ...filterData,
      page_number: 1,
      search_via: undefined,
      search_val: undefined,
    });
  };

  const getFilterData = (field, term) => ({
    search_via: term ? field : undefined,
    search_val: term || undefined,
    page_number: 1,
    page_size: 10,
  });

  const getClientsApi = (term) => getClients(getFilterData("name", term));
  const getHubsApi = (term) => getHubs(getFilterData("name", term));

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
            <MenuItem value="id">Rate Card ID</MenuItem>
            <MenuItem value="state">Status</MenuItem>
            <MenuItem value="client_id">Client</MenuItem>
            <MenuItem value="client_hub_id">Hub</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <If condition={activeFilter === "id"}>
            <TextField
              id="rc-id"
              style={{ width: 190 }}
              label="Rate Card ID"
              name="id"
              value={values.id}
              onChange={handleChange}
              helperText="comma seperated (eg: 1,2)"
              variant="outlined"
              size="small"
            />
          </If>
          {/* <If condition={activeFilter === "unit"}>
            <TextField
              id="rc-name"
              style={{ width: 190 }}
              label="Unit"
              name="unit"
              variant="outlined"
              value={values.name}
              onChange={handleChange}
              size="small"
            />
          </If> */}
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
              <MenuItem value="3">Inactive</MenuItem>
              <MenuItem value="4">Active</MenuItem>
            </TextField>
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
          <If condition={activeFilter === "client_hub_id"}>
            <AsyncSelect
              id="search-client"
              label="Search hub"
              style={{ width: 190 }}
              api={getHubsApi}
              name="client_hub_id"
              dataKey="result"
              value={values.client_hub_id}
              onChange={handleChange}
              format={{ id: "id", text: "name" }}
            />
          </If>
        </Grid>
        <Grid item>
          <ButtonGroup>
            <Button color="primary" variant="contained" type="submit">
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

export default RateCardFilters;
