import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import If from "../../../common/if";
import { useFormik } from "formik";
import AsyncSelect from "../../../common/async-select";
import { getClients, getHubs } from "../../../../api/delivery";
import { REQUIREMENT_STATE_NAME } from "../../../../constant/delivery";
import { resetFields } from "../../../../utils/form-handler";

const RequirementFilters = ({ filterData, setFilterData }) => {
  const { search_val, search_via, dropdown_val } = filterData;
  const [defaultValues, setDefaultValues] = useState({
    client_id: {},
    client_hub_id: {},
  });

  const initialValues = {
    search_via: search_via || "id",
    client_id: "",
    client_hub_id: "",
    id: search_via === "id" ? search_val : "",
    state: search_via === "state" ? search_val : "",
    reporting_date: search_via === "reporting_date" ? search_val : "",
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

  const { values, handleSubmit, handleChange } = formik;
  const activeFilter = values.search_via;

  const resetFilters = () => {
    resetFields({
      fields: Object.keys(initialValues),
      formik,
      defaultValues: { search_via: "id" },
    });
    setFilterData({
      ...filterData,
      page_number: 1,
      search_via: undefined,
      search_val: undefined,
      page_size: 10,
      dropdown_val: undefined,
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

  const handleDropdownChange = (event, newValue) => {
    const { name } = newValue || {};
    setFilterData({ ...filterData, dropdown_val: name });
  };

  useEffect(() => {
    if (
      (search_via === "client_id" || search_via === "client_hub_id") &&
      dropdown_val
    ) {
      setDefaultValues({
        ...defaultValues,
        [search_via]: { id: search_val, name: dropdown_val },
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        style={{ marginTop: "5px" }}
        spacing={2}
        justify="flex-end"
      >
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
            <MenuItem value="id">Requirement ID</MenuItem>
            <MenuItem value="state">Status</MenuItem>
            <MenuItem value="client_id">Client name</MenuItem>
            <MenuItem value="client_hub_id">Client hub name</MenuItem>
            <MenuItem value="reporting_date">Reporting date</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <If condition={activeFilter === "id"}>
            <TextField
              id="rc-id"
              style={{ width: 190 }}
              label="Requirement ID"
              name="id"
              value={values.id}
              onChange={handleChange}
              helperText="comma seperated (eg: 1,2)"
              variant="outlined"
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
              {REQUIREMENT_STATE_NAME.map((status, index) => (
                <MenuItem value={index + 1} key={index}>
                  {status}
                </MenuItem>
              ))}
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
              defaultValue={defaultValues.client_id}
              onInputChange={handleChange}
              onChange={handleDropdownChange}
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
              defaultValue={defaultValues.client_hub_id}
              onInputChange={handleChange}
              onChange={handleDropdownChange}
              format={{ id: "id", text: "name" }}
            />
          </If>
          <If condition={activeFilter === "reporting_date"}>
            <TextField
              id="datetime-local"
              label="Reporting date"
              type="date"
              style={{ width: 190 }}
              variant="outlined"
              size="small"
              name="reporting_date"
              value={values.reporting_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
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

export default RequirementFilters;
