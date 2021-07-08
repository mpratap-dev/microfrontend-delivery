import React, {useState, useEffect} from "react";
import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import If from "../../common/if";
import { useFormik } from "formik";
import { getCategories } from "../../../api/delivery";
import { DELIVERY_STATE, DELIVERY_STATE_NAMES } from "../../../constant/delivery";

const { INACTIVE, ACTIVE } = DELIVERY_STATE;
const ClientFilters = ({filterData, setFilterData}) => {
  const initialValues = {
    search_via: 'id',
    id: '',
    name: '',
    state: '',
    category: '' 
  }
  const [categories, setCategories] = useState([]);

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

  const getCategoriesApi = async () => {
    const {status, data} = await getCategories();
    if(status) {
      setCategories(data);
    }
  }

  const resetFilters = () => {
    resetForm();
    setFilterData({...filterData, page_number: 1, search_via: undefined, search_val: undefined });
  }

  useEffect(() => {
    getCategoriesApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <MenuItem value="id">Client ID</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="state">Status</MenuItem>
            <MenuItem value="category">Category</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <If condition={activeFilter === "id"}>
            <TextField
              id="client-id"
              style={{ width: 190 }}
              label="Client ID"
              name="id"
              value={values.id}
              onChange={handleChange}
              helperText="comma seperated (eg: 1,2)"
              variant="outlined"
              size="small"
            />
          </If>
          <If condition={activeFilter === "name"}>
            <TextField
              id="client-name"
              style={{ width: 190 }}
              label="Client name"
              name="name"
              variant="outlined"
              value={values.name}
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
              <MenuItem value={INACTIVE}>{DELIVERY_STATE_NAMES[INACTIVE]}</MenuItem>
              <MenuItem value={ACTIVE}>{DELIVERY_STATE_NAMES[ACTIVE]}</MenuItem>
            </TextField>
          </If>
          <If condition={activeFilter === "category"}>
            <TextField
              id="client-category"
              select
              style={{ width: 190 }}
              label="Select category"
              name="category"
              onChange={handleChange}
              value={values.category}
              variant="outlined"
              size="small"
            >
              {categories.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
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

export default ClientFilters;
