import React from 'react';
import Pagination from "@material-ui/lab/Pagination";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pagination: {
    '& .MuiPagination-ul': {
      justifyContent: 'flex-end',
    }
  }
}));

const AsyncPagination = (props) => {
  const smWidth = useMediaQuery('(max-width:600px)');
  const classes = useStyles();

  const { 
    total = 10,
    color="primary",
    handleChange: onPageChange,
    setPageData, 
    pageData,
    size=smWidth ? 'small': 'medium',
    searchPopupData 
  } = props || {};
  const { searchTerm, activeColumnName: column } = searchPopupData;

  const handlePageChange = (event, value) => {
    onPageChange({...pageData, page: value, value: searchTerm, column});
    setPageData({...pageData, page: value});
  };

  return (
    <Pagination 
      count={total} 
      color={color}
      onChange={handlePageChange} 
      page={Number(pageData.page)}
      shape="rounded"
      size={size}
      className={classes.pagination}
    /> 
  )
}

export default AsyncPagination;