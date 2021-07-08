import React from "react";
import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import If from "../../common/if";
import { useFormik } from "formik";
import AsyncSelect from "../../common/async-select";
import { getClients, getHubs } from "../../../api/delivery";

const FulfilmentFilters = ({ filterData, setFilterData }) => {
  const initialValues = {
    search_via: "client_id",
    client_id: "",
    client_hub_id: "",
    oye_number: "",
    client_driver_mobile: "",
    requirement_id: "",
    date: "",
  };
  const applyFilters = (values) => {
    const activeField = values.search_via;
    let activeFieldValue = values[activeField];
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
            <MenuItem value="client_id">Client Name</MenuItem>
            <MenuItem value="client_hub_id">Hub Name</MenuItem>
            <MenuItem value="oye_number">Oye Number</MenuItem>
            <MenuItem value="client_driver_mobile">Driver contact</MenuItem>
            <MenuItem value="requirement_id">Requirement Id</MenuItem>
            <MenuItem value="date">Reporting Date</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <If condition={activeFilter === "oye_number"}>
            <TextField
              id="oye_number"
              style={{ width: 190 }}
              label="Oye Number"
              name="oye_number"
              value={values.oye_number}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </If>
          <If condition={activeFilter === "client_driver_mobile"}>
            <TextField
              id="client_driver_mobile"
              type="number"
              style={{ width: 190 }}
              label="Client Driver Contact"
              name="client_driver_mobile"
              value={values.client_driver_mobile}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </If>
          <If condition={activeFilter === "requirement_id"}>
            <TextField
              id="requirement_id"
              type="number"
              style={{ width: 190 }}
              label="Requirement Id"
              name="requirement_id"
              value={values.requirement_id}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </If>
          <If condition={activeFilter === "date"}>
            {/* <DateRangeInput changeValue= {changeValue} name = 'date'/> */}
            <TextField
              id="datetime-local"
              label="Date"
              type="date"
              style={{ width: 190 }}
              variant="outlined"
              size="small"
              name="date"
              value={values.date}
              defaultValue={new Date(Date.now())}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
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

export default FulfilmentFilters;
