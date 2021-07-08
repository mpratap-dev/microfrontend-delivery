import React from "react";
import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core";
import { getClients } from "../../../api/delivery";
import AsyncSelect from "../../common/async-select";
import MenuItem from "@material-ui/core/MenuItem";
import If from "../../common/if";
import { useFormik } from "formik";
import {
  DELIVERY_STATE,
  DELIVERY_STATE_NAMES,
} from "../../../constant/delivery";

const { INACTIVE, ACTIVE } = DELIVERY_STATE;
const HubFilters = ({ filterData, setFilterData }) => {
  const getFilterData = (field, term) => ({
    search_via: term ? field : undefined,
    search_val: term || undefined,
    page_number: 1,
    page_size: 10,
  });

  const initialValues = {
    search_via: "client_id",
    client_id: "",
    id: "",
    name: "",
    state: "",
  };

  const getClientsApi = (term) => getClients(getFilterData("name", term));

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
            <MenuItem value="client_id">Client</MenuItem>
            <MenuItem value="id">Hub ID</MenuItem>
            <MenuItem value="name">Hub name</MenuItem>
            <MenuItem value="state">Status</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
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
          <If condition={activeFilter === "id"}>
            <TextField
              id="hub-id"
              style={{ width: 190 }}
              label="Hub ID"
              name="id"
              value={values.id}
              onChange={handleChange}
              helperText="comma seperated (eg: 1,2,10)"
              variant="outlined"
              size="small"
            />
          </If>
          <If condition={activeFilter === "name"}>
            <TextField
              id="hub-status"
              style={{ width: 190 }}
              label="Hub name"
              name="name"
              variant="outlined"
              value={values.name}
              onChange={handleChange}
              size="small"
            />
          </If>
          <If condition={activeFilter === "state"}>
            <TextField
              id="hub-status"
              select
              style={{ width: 190 }}
              label="Select status"
              name="state"
              onChange={handleChange}
              value={values.state}
              variant="outlined"
              size="small"
            >
              <MenuItem value={INACTIVE}>
                {DELIVERY_STATE_NAMES[INACTIVE]}
              </MenuItem>
              <MenuItem value={ACTIVE}>{DELIVERY_STATE_NAMES[ACTIVE]}</MenuItem>
            </TextField>
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

export default HubFilters;
