import React, { useEffect, useCallback } from "react";
import { Grid, TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { debounce } from "lodash";

const RequirementFilters = ({
  filterData, setFilterData, loading, setAddCommitments, setSearchValue, searchValue
}) => {
  const applyFilters = (activeFieldValue) => {
      if (activeFieldValue.length > 2)
        setFilterData({...filterData, search_val: activeFieldValue });
      else {
        setFilterData({...filterData, search_val: undefined });
        setAddCommitments([]);
      } 
  }

  const debouceSearch = useCallback(
    debounce(applyFilters, 500),
    []
  );

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    debouceSearch(searchValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
      <Grid container spacing={2} justify="flex-end">
        <Grid item>
          <TextField
            id="rc-id"
            style={{ width: 180 }}
            label="Mobile/Oye Number"
            name="client_driver_mobile_oye_number"
            onChange={handleChange}
            value={searchValue}
            helperText="Minimum 3 character"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </>
              ),
            }}
          />
        </Grid>
      </Grid>
  );
};

export default RequirementFilters;
