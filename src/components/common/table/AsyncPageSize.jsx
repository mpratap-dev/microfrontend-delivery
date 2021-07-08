import React from 'react';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';

const AsyncPageSize = ({ pageSizeOptions, setPageData, pageData, searchPopupData, handleChange }) => {
  
  const { searchTerm: value, activeColumnName: column } = searchPopupData;
  const handlePageSizeChange = (event) => {
    const data = {page: 1,  pageSize: event.target.value };
    setPageData(data);
    handleChange({...data, value, column})
  }

  return (
    <FormControl variant="filled">
      <TextField
        id="outlined-select-currency"
        select
        label="Entries"
        value={pageData.pageSize}
        onChange={handlePageSizeChange}
        size="small"
        variant="outlined"
      >
        {pageSizeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default AsyncPageSize;
