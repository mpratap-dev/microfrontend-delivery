import {
  FormControl,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { lazy } from "react";
import useSpacing from "../../../../hooks/useSpacing";
import AsyncSelect from "../../../common/async-select";
import { getClients } from "../../../../api/delivery";
import { hubDetailsFields } from "./fields";
import If from "../../../common/if";

const CoordinateSelector = lazy(() =>
  import("../../../common/coordinate-selector")
);

const { REACT_APP_MAP_URL } = process.env;

const HubDetails = (props) => {
  const spacing = useSpacing();
  const { formik, selectedClient, clientHubId, getIn } = props;
  const unEditableFields = ["hubLocation.lat", "hubLocation.lon"];

  const getFilterData = (field, term) => ({
    search_via: field,
    search_val: term,
    page_number: 1,
    page_size: 10,
  });

  const getClientsApi = (term) => getClients(getFilterData("name", term));

  const handleMapClick = ({ lat, lng }) => {
    formik.setFieldValue("hubLocation.lat", lat);
    formik.setFieldValue("hubLocation.lon", lng);
  };

  return (
    <Paper className={`${spacing.pa4} ${spacing.mb4}`}>
      <Typography variant="subtitle2" className={spacing.mb4} color="primary">
        Hub details
      </Typography>
      <FormControl fullWidth variant="filled" className={spacing.mb4} required>
        <AsyncSelect
          id="search-client"
          required
          label="Search client"
          api={getClientsApi}
          disabled={!!clientHubId}
          name="clientId"
          style={{ width: "100%" }}
          defaultValue={selectedClient}
          dataKey="result"
          format={{ id: "id", text: "name" }}
          value={formik.values.clientId}
          onInputChange={formik.handleChange}
          error={formik.touched.clientId && Boolean(formik.errors.clientId)}
          helperText={formik.touched.clientId && formik.errors.clientId}
        />
      </FormControl>

      {hubDetailsFields.map(
        (
          {
            type,
            label,
            textarea,
            select,
            rows,
            name,
            options,
            shrink,
            nested,
          },
          index
        ) => {
          const errors = nested
            ? getIn(formik.errors, name)
            : formik.errors[name];
          const touched = nested
            ? getIn(formik.touched, name)
            : formik.touched[name];

          return (
            <If
              key={index}
              lazyload
              condition={name !== "selector"}
              defaultCase={
                <If condition={!clientHubId}>
                  <div key={index} className={spacing.mb4}>
                    <CoordinateSelector
                      handleClick={handleMapClick}
                      googleMapURL={REACT_APP_MAP_URL}
                      inputProps={{
                        placeholder: "Search hub location",
                      }}
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `250px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  </div>
                </If>
              }
            >
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
                  disabled={clientHubId && unEditableFields.includes(name)}
                  rows={rows || 1}
                  select={!!select}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: shrink,
                  }}
                  required
                  name={name}
                  size="small"
                  value={formik.getFieldProps(name).value}
                  onChange={formik.handleChange}
                  error={touched && Boolean(errors)}
                  helperText={touched && errors}
                >
                  {Array.isArray(options) &&
                    options.map(({ id, name }, index) => (
                      <MenuItem key={index} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                </TextField>
              </FormControl>
            </If>
          );
        }
      )}
    </Paper>
  );
};

export default HubDetails;
